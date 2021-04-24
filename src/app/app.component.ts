import { Component, OnInit, VERSION } from '@angular/core';
import * as faker from 'faker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Accounts } from './core/data/account';
import { Account, createAccount, createParamSearch, ParamSearch } from './core/model/account.model';
import { AccountService } from './core/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  account: Account[] = [];
  unSubscribeAll: Subject<any>;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  searchStr = '';

  constructor(private accountService: AccountService) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }

  listFilter: any = [
    {
      Text: 'Họ',
      type: 'text',
      data: [],
      condition: 'last_name'
    },
    {
      Text: 'Tên',
      type: 'text',
      data: [],
      condition: 'first_name'
    },
    {
      Text: 'Địa chỉ',
      type: 'text',
      data: [],
      condition: 'address'
    },
    {
      Text: 'Email',
      type: 'text',
      data: [],
      condition: 'email'
    },
    {
      Text: 'Giới tính',
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
  dataSub: any = [];

  ngOnInit(): void {
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
    console.log(value);

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

  openAddAccount(): void {
    this.isOpenAddAccount = true;
  }

  openEdit(acc: Account): void {
    this.selectedAccount = acc;
    this.isOpenEditAccount = true;
  }

  saveEdit(): void {
    const editedAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: 25,
      lastname: faker.name.lastName(),
      firstname: faker.name.lastName(),
      city: this.selectedAccount?.city,
      account_number: this.selectedAccount?.account_number,
      address: this.selectedAccount?.address,
      email: this.selectedAccount?.email,
      employer: this.selectedAccount?.employer,
      gender: 'F',
      state: this.selectedAccount?.state,
      _id: this.selectedAccount?._id
    });

    this.accountService.editAccount(editedAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.getAllAccount();
        this.isOpenEditAccount = false;
      }, (err: Error) => {
        this.account = [];
      });
  }

  saveNew(): void {
    const newAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: 25,
      lastname: faker.name.lastName(),
      firstname: faker.name.lastName(),
      city: faker.address.city(),
      account_number: faker.finance.account(),
      address: faker.address.streetAddress(),
      email: faker.internet.email(),
      employer: faker.name.lastName(),
      gender: 'F',
      state: faker.address.stateAbbr()
    });

    this.accountService.addAccount(newAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.getAllAccount();
        this.isOpenAddAccount = false;
      }, (err: Error) => {
        this.account = [];
      });
  }

  search(): void {
    this.getAllAccount();
  }
}
