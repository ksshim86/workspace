import { ipcRenderer } from 'electron'

export async function FETCH_PROJECTS (context) {
  const res = await ipcRenderer.invoke('selectProjects')

  if (res.result) {
    if (res.rows !== undefined && res.rows.length > 0) {
      context.commit('SET_PROJECTS', res.rows)
    }
  }
}

export async function SET_PROJECT (context, project) {
  context.commit('SET_PROJECT', project)
}
