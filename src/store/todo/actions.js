import { ipcRenderer } from 'electron'

export function SET_SELECTED_WORK (context, payload) {
  context.commit('SET_SELECTED_WORK', payload)
}

export async function FETCH_WORKS (context) {
  const res = await ipcRenderer.invoke('getWork')

  if (res.result) {
    if (res.rows.length > 0) {
      context.commit('SET_WORKS', res.rows)
    }
  }
}

export async function SET_WORK (context, work) {
  const obj = await ipcRenderer.invoke('createWork', work)

  if (obj.result) {
    context.commit('SET_WORK', work)
  }

  return obj
}

export function SET_EDIT_WORK_ID (context, id) {
  context.commit('SET_EDIT_WORK_ID', id)
}
