const state = {
    visible_filter: false
};
const getters = {
    getVisibleFilter: (state) => {
        return state.visible_filter;
    }
};
const mutations = {
    setVisibleFilter(state, visible_filter) {
        state.visible_filter = visible_filter;
    }
};
const actions = {
    setVisibleFilter({commit, visible_filter}) {
        commit('setVisibleFilter', visible_filter);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}


