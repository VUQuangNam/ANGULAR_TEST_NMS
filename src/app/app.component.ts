import { Component, OnInit, VERSION } from '@angular/core';
import * as faker from 'faker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Accounts } from './core/data/account';
import { Account, createAccount, createParamSearch, ParamSearch } from './core/model/account.model';
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
    private swal: SwalService
  ) {
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }
  // strat config model 
  listFilter: any = [
    {
      text: 'Họ',
      type: 'text',
      data: [],
      condition: 'last_name'
    },
    {
      text: 'Tên',
      type: 'text',
      data: [],
      condition: 'first_name'
    },
    {
      text: 'Địa chỉ',
      type: 'text',
      data: [],
      condition: 'address'
    },
    {
      text: 'Email',
      type: 'text',
      data: [],
      condition: 'email'
    },
    {
      text: 'Giới tính',
      type: 'select',
      data: [{
        name: 'Male',
        value: "M"
      }, {
        name: 'Female',
        value: "F"
      }],
      condition: 'gender'
    }]
  listlable: any = [
    {
      id: '_id',
      name: 'ID',
      width: 200,
      type: 'string'
    },
    {
      id: 'account_number',
      name: 'Số tài khoản',
      width: 100,
      type: 'string'
    },
    {
      id: 'balance',
      name: 'Số dư',
      width: 200,
      type: 'number'
    },
    {
      id: 'age',
      name: 'Tuổi',
      width: 200,
      type: 'number',
    },
    {
      id: 'firstname',
      name: 'Họ',
      width: 200,
      type: 'string',
    },
    {
      id: 'lastname',
      name: 'Tên',
      width: 200,
      type: 'string',
    },
    {
      id: 'gender',
      name: 'Giới tính',
      width: 200,
      type: 'string',
    },
    {
      id: 'address',
      name: 'Địa chỉ',
      width: 200,
      type: 'string',
    },
    {
      id: 'employer',
      name: 'Tên chủ thẻ',
      width: 200,
      type: 'string',
    },
    {
      id: 'email',
      name: 'Email',
      width: 200,
      type: 'string',
    },
    {
      id: 'city',
      name: 'Thành phố',
      width: 200,
      type: 'string',
    },
    {
      id: 'state',
      name: 'Quận',
      width: 200,
      type: 'string',
    },
    {
      id: 'setting',
      name: '',
      width: 200,
      type: 'setting',
    }
  ];
  listBaseCreate: any = [
    {
      id: '_id',
      label: 'ID',
      name: '_id',
      type: 'string',
      class: 'col-6'
    },
    {
      id: 'account_number',
      label: 'Số tài khoản',
      name: 'account_number',
      type: 'string',
      class: 'col-6'
    },
    {
      id: 'balance',
      label: 'Số dư',
      name: 'balance',
      type: 'number',
      class: 'col-6'
    },
    {
      id: 'age',
      label: 'Tuổi',
      name: 'age',
      type: 'number',
      class: 'col-6'
    },
    {
      id: 'firstname',
      label: 'Họ',
      name: 'firstname',
      type: 'string',
      class: 'col-6'
    },
    {
      id: 'lastname',
      label: 'Tên',
      name: 'lastname',
      type: 'string',
      class: 'col-6'
    },
    {
      id: 'gender',
      label: 'Giới tính',
      name: 'gender',
      type: 'selected',
      class: 'col-6',
      data: [
        { value: 'F', Name: 'Female' },
        { value: 'M', Name: 'Male' },
      ]
    },
    {
      id: 'address',
      label: 'Địa chỉ',
      name: 'address',
      type: 'string',
      class: 'col-6'
    },
    {
      id: 'employer',
      label: 'Tên chủ thẻ',
      name: 'employer',
      type: 'string',
      class: 'col-6'
    },
    {
      id: 'email',
      label: 'Email',
      name: 'email',
      type: 'string',
      class: 'col-6'
    },
    {
      id: 'city',
      label: 'Thành phố',
      name: 'city',
      type: 'string',
      class: 'col-6'
    },
    {
      id: 'state',
      label: 'Quận',
      name: 'state',
      type: 'string',
      class: 'col-6'
    }
  ]
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

  ngOnInit() {
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
    if (!param) param = {
      start: 0,
      limit: 25
    }
    this.accountService.getAccounts(createParamSearch(param))
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        console.log(resp);
        this.account = resp;
        this.dataSub = resp;
      }, (err: Error) => {
        this.account = [];
      });
  }
}
