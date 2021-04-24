import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
    @Input() listFilter: any;
    @Input() data: any;
    @Output() callback = new EventEmitter<any>();
    constructor() { }

    onChangeValueDate = (event: any, item: any) => {
        item.value = event.value;
        this.callback.emit(item)
    }
}

@NgModule({
    declarations: [
        FilterComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FilterComponent
    ]
})
export class FilterBaseModule { }