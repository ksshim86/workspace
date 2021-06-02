export function SET_SELECTED_WORK (state, work) {
  state.selectedWork = work
}

export function SET_WORKS (state, works) {
  state.works = works
}

export function SET_WORK (state, work) {
  state.works.push(work)
}

export function SET_EDIT_WORK_ID (state, id) {
  console.log(`SET_EDIT_WORK_ID: ${id}`)
  state.editWorkId = id
}
