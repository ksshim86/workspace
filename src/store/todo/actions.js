import { ipcRenderer } from 'electron'

export async function FETCH_IS_WORKSPACE (context) {
  const { isWorkspace } = await ipcRenderer.invoke('isWorkspace')
  context.commit('FETCH_IS_WORKSPACE', isWorkspace)
}

export function SET_SELECTED_WORK (context, work) {
  context.commit('SET_SELECTED_WORK', work)
  context.dispatch('FETCH_TODOS', work.id)
}

export async function FETCH_WORKS (context) {
  const res = await ipcRenderer.invoke('selectWorks')

  if (res.result) {
    if (res.rows !== undefined && res.rows.length > 0) {
      context.commit('SET_WORKS', res.rows)
      context.dispatch('FETCH_TODOS')
    }
  }
}

export async function SET_WORK (context, work) {
  const obj = await ipcRenderer.invoke('insertWork', work)

  if (obj.result) {
    context.commit('SET_WORK', work)
  }

  return obj
}

export function SET_EDIT_WORK_ID (context, id) {
  context.commit('SET_EDIT_WORK_ID', id)
}

export async function SET_EDIT_WORK (context, work) {
  const obj = await ipcRenderer.invoke('editWork', work)

  if (obj.result) {
    context.dispatch('FETCH_WORKS')
  }

  return obj
}

export async function DELETE_WORK_BY_ID (context, id) {
  const obj = await ipcRenderer.invoke('deleteWorkById', id)

  if (obj.result) {
    context.dispatch('FETCH_WORKS')
  }

  return obj
}

export async function FETCH_TODOS (context) {
  const res = await ipcRenderer.invoke('selectTodos', context.state.selectedWork.id)

  if (res.result) {
    if (res.rows !== undefined && res.rows.length > 0) {
      context.commit('SET_TODOS', res.rows)
    } else {
      context.commit('SET_TODOS', [])
    }
  }
}
