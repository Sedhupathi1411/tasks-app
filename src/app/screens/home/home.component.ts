import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiDialogFormService } from '@taiga-ui/kit';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { StorageService } from 'src/app/services/storage.service';


export interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDialogFormService],
})
export class HomeComponent {

    tasks: Task[] = [];
    storage = new StorageService<Task[]>("tasks");
    formGroup = new FormGroup({} as any);

    newTaskTitle = '';
    taskIndexToDelete: number | null = null;
    taskIndexToToggle: number | null = null;

    constructor(
        @Inject(TuiDialogFormService) private readonly dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    ) { }

    async ngOnInit() {
        // Retrieve all the tasks from the storage and store it in `this.tasks`
        const tasks = await this.storage.get();
        tasks?.forEach(task => this.createController(task.isCompleted, task.id));
        if (tasks) this.tasks = tasks;
    }

    onCreateTaskModelChange(value: string): void {
        this.newTaskTitle = value;
        this.dialogForm.markAsDirty();
    }

    promptTaskName(content: PolymorpheusContent): void {
        const closeable = this.dialogForm.withPrompt({
            label: 'Are you sure?',
            data: {
                content: 'Your data will be <strong>lost</strong>',
            }
        });

        this.dialogs.open(content, { closeable, dismissible: closeable }).subscribe({
            complete: () => {
                if (this.newTaskTitle) this.createTask();
                this.newTaskTitle = '';
                this.dialogForm.markAsPristine();
            },
        });
    }

    createTask() {
        // Get a new index (largest index + 1)
        let lastIndex = Math.max(...this.tasks.map(t => t.id));
        if (!(lastIndex > 0)) lastIndex = 1; // not an empty list

        // create the task, add controller and update the storage
        const id = lastIndex + 1;
        const task = { id, title: this.newTaskTitle, isCompleted: false };
        this.tasks.push(task);
        this.createController(false, id);
        this.storage.update(this.tasks);

        console.log(`Task created | ${task.id} | "${task.title}"`);
    }

    createController(isCompleted: boolean, id: number) {
        this.formGroup.addControl(`${id}`, new FormControl(isCompleted));
    }

    onCheckboxClicked(i: number, content: PolymorpheusContent) {
        this.taskIndexToToggle = i;
        this.dialogs.open(content).subscribe({ complete: () => this.dialogForm.markAsPristine() });
    }

    // FIXME: only delete the task
    toggleCompletionStatus(i: number) {
        this.deleteTask(i);
    }

    openDeleteConfirmDialog(i: number, content: PolymorpheusContent) {
        this.taskIndexToDelete = i;
        this.dialogs.open(content, { closeable: false }).subscribe({ complete: () => this.dialogForm.markAsPristine() });
    }

    deleteTask(i: number) {
        this.tasks.splice(i, 1);
        this.storage.update(this.tasks);
    }

}
