export function GET_WORKS (state) {
  return state.works
}

export function GET_SELECTED_WORK (state) {
  return state.selectedWork
}

export function GET_WORK_BY_ID (state) {
  let findWork = state.works.find((work) => work.id === state.editWorkId)

  findWork = findWork !== undefined ? findWork : { name: '' }

  return findWork
}
