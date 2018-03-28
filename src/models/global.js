import { message, Modal } from 'antd/lib/index';
import { queryMenu, queryNotices, postSessionUpdate, getUserBySession, queryExamPlanNameSelect, postExamPlanSessionUpdate } from '../services/api';
import { queryCurrent, queryRole } from '../services/user';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    fetchingNotices: false,
  },

  effects: {
    *fetchMenu(_, { call, put }) {
      const response = yield call(queryMenu, { srId: '' });
      if (response.status === '1') {
        yield put({
          type: 'saveMenu',
          payload: response.dataMain.list,
        });
      } else {
        message.error(response.msg);
      }
    },
    *fetchSessionAndRole(_, { call, put }) {
      const response = yield call(getUserBySession);
      if (response.status === '1') {
        const response1 = yield call(queryRole, { surUserId: response.dataMain.sessionUserVo.susId });
        console.log('session数据后端响应：', response);
        if (response1.status === '1') {
          console.log('role数据后端响应：', response1);
          yield put({
            type: 'saveRole',
            payload: response1.dataMain.list,
          });
        } else {
          Modal.info({
            title: response1.msg,
            onOk() {
              window.location.href = 'login.html';
            },
          });
        }
      }
    },
    *switch(_, { put }) {
      yield put(routerRedux.push('/user/role'));
    },
    *toIndex(_, { put }) {
      yield put(routerRedux.push('/index'));
    },
    // 选定角色后：0.更新session 1.获取session 2.获取计划select 3.根据role获取菜单
    *sessionUpdateAndFetch({ payload }, { call, put }) {
      const response = yield call(postSessionUpdate, payload);
      console.log('postSessionUpdate', response);
      if (response.status === '1') {
        console.log('sessionUpdate数据后端响应：', response);
        const response1 = yield call(getUserBySession);
        console.log('response1,', response1);
        yield put({
          type: 'saveUserSession',
          payload: response1.dataMain.sessionUserVo,
        });
        const response2 = yield call(queryExamPlanNameSelect,
          { depUnitId: response1.dataMain.sessionUserVo.sesUnitId });
        yield put({
          type: 'examPlanSelectSave',
          payload: response2.dataMain.list,
        });
        const response3 = yield call(queryMenu, { srmRoleId: response1.dataMain.sessionUserVo.sesRoleId });
        console.log(response3);
        yield put({
          type: 'saveMenu',
          payload: response3.dataMain.list,
        });
        // yield put(routerRedux.push('/index'));
      } else {
        message.error(response.msg);
      }
    },
    // 切换考试计划
    *examPlanSessionUpdate({ payload }, { call, put }) {
      const response = yield call(postExamPlanSessionUpdate, payload);
      if (response.status === '1') {
        yield put(routerRedux.push('/index'));
      } else {
        message.error(response.msg);
      }
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchNotices(_, { call, put }) {
      yield put({
        type: 'changeNoticeLoading',
        payload: true,
      });
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data.dataMain,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.dataMain.length,
      });
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      yield put(routerRedux.push('/user/login'));
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    examPlanSelectSave(state, { payload }) {
      return {
        ...state,
        examPlanSelectData: payload,
      };
    },
    saveUserSession(state, { payload }) {
      return {
        ...state,
        userSessionData: payload,
      };
    },
    saveRole(state, { payload }) {
      return {
        ...state,
        roleData: payload,
      };
    },
    saveMenu(state, { payload }) {
      return {
        ...state,
        menuData: payload,
      };
    },
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        submitting: false,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
        fetchingNotices: false,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    changeNoticeLoading(state, { payload }) {
      return {
        ...state,
        fetchingNotices: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
