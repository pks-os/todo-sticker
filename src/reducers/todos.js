// @flow
import type {Actions, EditAction, DeleteAction} from '../actions';
import type {TodoState} from '../states';
import {ActionTypes} from '../actions';
import uniqid from 'uniqid';

function todos(state: TodoState[] = [], action: Actions) {

    switch (action.type) {
    case ActionTypes.Add:
        return ([
            ...state,
            {
                id: uniqid(),
                description: action.todoState.description,
                notificationDate: action.todoState.notificationDate,
                notificationTime: action.todoState.notificationTime,
                complete: false
            }
        ]);

    case ActionTypes.Edit:
        let editAction: EditAction = action;
        return (
            state.map( todoState => {
                if (todoState.id == editAction.todoState.id) {
                    return {
                        ...todoState,
                        ...editAction.todoState
                    };
                }
                return todoState;
            })
        );
    case ActionTypes.Delete:
        let deleteAction: DeleteAction = action;
        return state.filter(todoState => todoState.id !== deleteAction.id);
    default:
        return state;
    }
}

export default todos;
