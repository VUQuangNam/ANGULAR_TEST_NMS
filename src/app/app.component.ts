import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Accounts } from './core/data/account';
import { Account, AccountConfigModel, createParamSearch, ParamSearch } from './core/model/account.model';
import { AccountService } from './core/services/account.service';
import { SwalService } from './core/services/swal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  account: Account[] = [];
  unSubscribeAll: Subject<any>;

  constructor(
    private accountService: AccountService,
    private swal: SwalService,
  ) {
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }
  // strat config model 
  listFilter: any = []
  listlable: any = [];
  listBaseCreate: any = []
  arrayButton: any = [{
    class: 'mbf-btn-cancel',
    text: 'Hủy bỏ'
  },
  {
    class: 'mbf-btn-save',
    text: 'Lưu'
  }]
  // end config model 
  dataSub: any = [];
  modelAcount: any = {};
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  config = new AccountConfigModel;
  isLoading = false;

  ngOnInit() {
    this.listFilter = this.config.filter;
    this.listlable = this.config.collums;
    this.listBaseCreate = this.config.create;
    this.getAllAccount();
  }

  handleCallback = () => {
    const filter = this.listFilter.filter((x: any) => x.value);
    let param: any = {
      start: 0,
      limit: 25
    }
    if (filter.length) {
      filter.forEach((x: any) => {
        param[x.condition] = x.value
      });
    }
    this.getAllAccount(param)
  }

  handleCallbackSettingTable = (value: any) => {
    switch (value.type) {
      case 'delete':
        this.accountService.deleteAccount(value.item).subscribe(res => {
          this.dataSub = this.dataSub.filter((x: any) => x._id !== value.item._id);
        })
        break;
      case 'edit':
        this.isOpenEditAccount = true;
        this.isOpenAddAccount = false;
        this.modelAcount = value.item;
        break;
      default:
        break;
    }

  }

  onChangeViewCreate = () => {
    this.isOpenAddAccount = true;
    this.isOpenEditAccount = false;
  }

  handleCallbackEventBaseCreate = (data: any) => {
    switch (data.Type.text) {
      case "Hủy bỏ":
        this.isOpenAddAccount = false;
        this.isOpenEditAccount = false;
        break;
      case "Lưu":
        if (
          !data.data.account_number ||
          !data.data.address ||
          !data.data.age ||
          !data.data.balance ||
          !data.data.city ||
          !data.data.email ||
          !data.data.employer ||
          !data.data.firstname ||
          !data.data.gender ||
          !data.data.lastname ||
          !data.data._id
        ) return this.swal.error('Vui lòng kiểm tra lại thông tin');
        if (this.isOpenAddAccount) {
          this.accountService.addAccount(data.data).subscribe(res => {
            this.swal.success('Thêm mới thành công');
          }, () => {
            this.swal.error('Thêm mới thất bại');
          }, () => {
            this.isOpenAddAccount = false;
            this.isOpenEditAccount = false;
          })
        }
        if (this.isOpenEditAccount) {
          this.accountService.editAccount(data.data).subscribe(res => {
            this.swal.success('Thêm mới thành công');
          }, () => {
            this.swal.error('Thêm mới thất bại');
          }, () => {
            this.isOpenAddAccount = false;
            this.isOpenEditAccount = false;
          })
        }
        break;
      default:
        break;
    }
  }

  loadDataToLocal(): void {
    localStorage.setItem('accounts', JSON.stringify(Accounts));
  }

  getAllAccount = (param?: Partial<ParamSearch>) => {
    this.isLoading = false;
    if (!param) param = {
      start: 0,
      limit: 25
    }
    this.accountService.getAccounts(createParamSearch(param))
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.account = resp;
        this.dataSub = resp;
      }, (err: Error) => {
        this.account = [];
      }, () => {
        this.isLoading = true;
      });
  }
}
