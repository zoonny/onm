export const Constants = {
  MODAL: {
    CONFIRM: 'confirm',
  },
  EDIT_MODE: {
    NONE:'NONE',
    WRITE: 'WRITE',
    READ: 'READ',
    EDIT: 'EDIT',
  },
  EDIT_TITLE: {
    WRITE: '등록',
    READ: '조회',
    EDIT: '수정',
  },
  BUTTON: {
    WRITE: '등록',
    READ: '조회',
    EDIT: '수정',
    DELETE: '삭제',
    CLOSE: '닫기',
    CONFIRM: '확인',
    CANCEL: '취소',
  },
  EXCEL: {
    SETLDSTRB_NAME: '정산내역',
    SETLBILL_NAME: '정산청구',
    TYPE: '.xlsx',
  },
};

export const GetConstants = {
  getEditTitle: mode => {
    return Constants.EDIT_TITLE[mode];
  },
};
