const urlMaps = {
  login: '/api/user/login',
  logout: '/api/user/logout',
  register: '/api/user/register',
  getUserInfo: '/api/user/userInfo',
  previewApp: `/api/preview/app`,
  previewPage: `/api/preview/page`,
  preview: `/api/preview/preview`,
  appList: `/api/app/page`,
  appInfo: `/api/app/info`,
  appRemove: `/api/app/remove`,
  appAdd: `/api/app/save`,
  pageList: `/api/page/page`,
  pageInfo: `/api/page/info`,
  pageRemove: `/api/page/remove`,
  pageAdd: `/api/page/save`,
  scaffoldList: `/api/scaffold/page`,
  scaffoldFiles: `/api/scaffold/files`,
  scaffoldFileContent: `/api/scaffold/fileContent`,
  scaffoldInfo: `/api/scaffold/info`,
  scaffoldRemove: `/api/scaffold/remove`,
  scaffoldAdd: `/api/scaffold/save`,
  interAppList: `/api/interapp/page`,
  interAppInfo: `/api/interapp/info`,
  interAppRemove: `/api/interapp/remove`,
  interAppAdd: `/api/interapp/save`,
  interList: `/api/inter/page`,
  interInfo: `/api/inter/info`,
  interRemove: `/api/inter/remove`,
  interAdd: `/api/inter/save`,
  layoutList: `/api/layout/page`,
  layoutInfo: `/api/layout/info`,
  layoutRemove: `/api/layout/remove`,
  layoutAdd: `/api/layout/save`,
  templateList: `/api/template/page`,
  templateInfo: `/api/template/info`,
  templateRemove: `/api/template/remove`,
  templateAdd: `/api/template/save`,
  componentList: `/api/component/page`,
  componentInfo: `/api/component/info`,
  componentRemove: `/api/component/remove`,
  componentAdd: `/api/component/save`,
  validList: `/api/valid/page`,
  validInfo: `/api/valid/info`,
  validRemove: `/api/valid/remove`,
  validAdd: `/api/valid/save`
};

// export const baseUrl = "http://share.axingxing.com/proxy"
export const baseUrl = '';

export const loginWhiteList = [urlMaps.getUserInfo, urlMaps.getBannerList];

export default urlMaps;
