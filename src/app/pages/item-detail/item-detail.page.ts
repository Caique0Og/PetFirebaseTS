import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Item } from '../../services/data.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.page.html',
    styleUrls: ['./item-detail.page.scss'],
    standalone: false,
})
export class ItemDetailPage implements OnInit {
    item: Item = {
        id: '',
        name: '',
        description: '',
        createdAt: 0
    };
    
    itemId: string | null = null;
    isNewItem = true;

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
        private router: Router,
        private loadingController: LoadingController,
        private toastController: ToastController
    ) {}

    ngOnInit() {
        this.itemId = this.route.snapshot.paramMap.get('id');
        if (this.itemId) {
            this.isNewItem = false;
            this.loadItem();
        }
    }

    async loadItem() {
        const loading = await this.loadingController.create({
            message: 'Carregando item...'
        });
        await loading.present();

        this.dataService.getItem(this.itemId!).subscribe(
            (res) => {
                loading.dismiss();
                if (res) {
                    this.item = res;
                } else {
                    this.presentToast('Item não encontrado!', 'danger');
                    this.router.navigateByUrl('/home');
                }
            },
            (err) => {
                loading.dismiss();
                this.presentToast('Erro ao carregar item.', 'danger');
                this.router.navigateByUrl('/home');
            }
        );
    }

    async saveItem() {
        const loading = await this.loadingController.create({
            message: 'Salvando item...'
        });
        await loading.present();

        if (this.isNewItem) {
            this.dataService.addItem(this.item).then(
                () => {
                    loading.dismiss();
                    this.presentToast('Item adicionado com sucesso!', 'success');
                    this.router.navigateByUrl('/home');
                },
                (err) => {
                    loading.dismiss();
                    this.presentToast('Erro ao adicionar item.', 'danger');
                }
            );
        } else {
            this.dataService.updateItem(this.item).then(
                () => {
                    loading.dismiss();
                    this.presentToast('Item atualizado com sucesso!', 'success');
                    this.router.navigateByUrl('/home');
                },
                (err) => {
                    loading.dismiss();
                    this.presentToast('Erro ao atualizar item.', 'danger');
                }
            );
        }
    }

    async presentToast(message: string, color: string = 'primary') {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            color: color
        });
        await toast.present();
    }
}