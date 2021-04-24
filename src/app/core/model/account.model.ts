import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export type Account = {
  _id: string;
  account_number: string;
  balance: number;
  age: number;
  firstname: string;
  lastname: string;
  gender: string;
  address: string;
  employer: string;
  email: string;
  city: string;
  state: string;
};

export function createAccount(data: Partial<Account>): Account {
  return {
    ...data,
  } as Account;
}


export type ParamSearch = {
  limit: number;
  start: number;
  last_name: string;
  first_name: string;
  email: string;
  gender: string;
  address: string;
};

export function createParamSearch(param: Partial<ParamSearch>): ParamSearch {
  return {
    ...param
  } as ParamSearch;
}

export class AccountConfigModel {
  public get collums(): Array<CollumsModel> {
    return [
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
  }
  public get create(): Array<CreateModel> {
    return [
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
        data: []
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
    ];
  }
  public get filter(): Array<FilterModel> {
    return [
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
        data: []
      }
    ]
  }
  public get btnActice(): Array<any> {
    return [
      {
        class: 'mbf-btn-create',
        text: 'Thêm mới',
        type: 'create',
      },
      {
        class: 'mbf-btn-active',
        text: 'Thao tác',
        type: 'active',
      }
    ];
  }
}
