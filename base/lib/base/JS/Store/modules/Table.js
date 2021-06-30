const state = {
    current_page: localStorage.getItem('current_page')
};
const getters = {
    getCurrentPage: (state) => {
        return state.current_page;
    }
};
const mutations = {
    setCurrentPage(state, current_page) {
        localStorage.setItem('current_page', current_page)
        state.current_page = current_page;
    }
};
const actions = {
    setCurrentPage({commit, current_page}) {
        commit('setCurrentPage', current_page);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}


