import { ipcRenderer } from 'electron'

export async function FETCH_PROJECTS (context) {
  const res = await ipcRenderer.invoke('selectProjects')

  if (res.result) {
    if (res.rows !== undefined && res.rows.length > 0) {
      context.commit('SET_PROJECTS', res.rows)
    }
  }
}
