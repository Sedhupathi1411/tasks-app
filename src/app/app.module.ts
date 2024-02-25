import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiSvgModule, TuiButtonModule } from "@taiga-ui/core";
import { TuiAppBarModule } from "@taiga-ui/addon-mobile";
import { TuiCheckboxModule, TuiInputModule, TuiIslandModule } from '@taiga-ui/kit';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        TuiAppBarModule,
        TuiButtonModule,
        TuiSvgModule,
        TuiIslandModule,
        TuiCheckboxModule,
        TuiInputModule
    ],
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
    bootstrap: [AppComponent]
})
export class AppModule { }
