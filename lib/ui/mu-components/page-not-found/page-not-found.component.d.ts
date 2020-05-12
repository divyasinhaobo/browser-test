import { OnInit } from '@angular/core';
import { RunContextApp } from 'framework';
export declare class PageNotFoundComponent implements OnInit {
    protected rc: RunContextApp;
    constructor(rc: RunContextApp);
    ngOnInit(): void;
    onHomeClick(): void;
}
