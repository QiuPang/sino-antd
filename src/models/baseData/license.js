/* eslint-disable linebreak-style,no-param-reassign */
import { message } from 'antd';
import { viewLicense, viewExaminee, viewPhoto, queryLicense, removeLicense, addLicense, updateLicense, queryAreaSelect, querySubjectSelect, queryExamPlanNameSelect } from '../../services/api';

export default {
  namespace: 'license',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    checkData: {},
    loading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryLicense, payload);
      if (response.status === '1') {
        yield put({
          type: 'save',
          payload: response.dataMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('license查询前端传值：', payload);
      console.log('license查询后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *view({ payload, callback }, { call, put }) {
      const response = yield call(viewLicense, payload);
      if (response.status === '1') {
        yield put({
          type: 'viewSave',
          payload: response.dataMain.dataLicenseVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('license详情单条记录前端传值：', payload);
      console.log('license详情单条记录后端响应：', response);
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addLicense, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('license列表添加前端传值：', payload);
      console.log('license列表添加后端响应：', response);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateLicense, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('license列表修改前端传值：', payload);
      console.log('license列表修改后端响应：', response);
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeLicense, payload);
      if (response.status === '1') {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
      console.log('license删除前端传值：', payload);
      console.log('license删除后端响应：', response);

      if (callback) callback();
    },
    *examPlanNameSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryExamPlanNameSelect, payload);
      console.log('license考试计划下拉菜单前端传值：', payload);
      console.log('license考试计划下拉菜单后端响应：', response);
      yield put({
        type: 'examPlanNameSelectSave',
        payload: response,
      });
      if (callback) callback();
    },
    *areaSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryAreaSelect, payload);
      console.log('license行政区下拉菜单前端传值：', payload);
      console.log('license行政区下拉菜单后端响应：', response);
      yield put({
        type: 'areaSelectSave',
        payload: response,
      });
      if (callback) callback();
    },
    *subjectSelect({ payload, callback }, { call, put }) {
      const response = yield call(querySubjectSelect, payload);
      console.log('license科目下拉菜单前端传值：', payload);
      console.log('license科目下拉菜单后端响应：', response);
      yield put({
        type: 'subjectSelectSave',
        payload: response,
      });
      if (callback) callback();
    },
    *examineeView({ payload, callback }, { call, put }) {
      const response = yield call(viewExaminee, payload);
      if (response.status === '1') {
        yield put({
          type: 'examineeViewSave',
          payload: response.dataMain.dataExamineeVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('license 中 Examinee详情单条记录前端传值：', payload);
      console.log('license 中 Examinee详情单条记录后端响应：', response);
      if (callback) callback();
    },
    *photoView({ payload, callback }, { call, put }) {
      const response = yield call(viewPhoto, payload);
      if (response.status === '1') {
        yield put({
          type: 'photoViewSave',
          payload: response.dataMain.dataPhotoVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('license 中 photo详情单条记录前端传值：', payload);
      console.log('license 中 photo详情单条记录后端响应：', response);
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    viewSave(state, action) {
      return {
        ...state,
        viewData: action.payload,
      };
    },
    examineeViewSave(state, action) {
      return {
        ...state,
        examineeViewData: action.payload,
      };
    },
    photoViewSave(state, action) {
      return {
        ...state,
        photoViewData: action.payload,
      };
    },
    examPlanNameSelectSave(state, action) {
      return {
        ...state,
        examPlanNameSelectData: action.payload,
      };
    },
    areaSelectSave(state, action) {
      return {
        ...state,
        areaSelectData: action.payload,
      };
    },
    subjectSelectSave(state, action) {
      return {
        ...state,
        subjectSelectData: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
