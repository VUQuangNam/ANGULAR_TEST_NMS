import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    @Input() data: any;
    @Input() option: any;
    @Input() arrayButton: any;
    @Input() dataModel?: any;
    @Output() callback = new EventEmitter<any>();

    model: any = {};

    constructor(
    ) { }

    ngOnInit() {
        this.model = this.dataModel || {};
    }

    onClickButton = (i: any) => {
        this.callback.emit({
            data: this.model,
            Type: i
        });
    }
}

@NgModule({
    declarations: [
        CreateComponent,
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CreateComponent
    ]
})
export class CreateBaseModule { }