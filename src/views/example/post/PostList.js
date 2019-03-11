import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import PostItem from './PostItem';

const columns = ['번호', '제목', '내용', '태그', '작성일', '편집'];

const PostList = ({ posts, onItemClick, onItemEdit, onItemDelete }) => {
  if (!posts) return <div>No Data...</div>;

  return (
    <div className="animated fadeIn">
      <Table responsive hover>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <PostItem
              key={index}
              index={index}
              post={post}
              onItemClick={onItemClick}
              onItemEdit={onItemEdit}
              onItemDelete={onItemDelete}
            />
          ))}
        </tbody>
      </Table>
      <ul className="Inh_btnList">        
        <li>
        <Button color="dark" outline size="sm">
          비밀번호 초기화
        </Button>
        </li> 
        <li className="float-right">
        {/* 테이블속에 들어가는 버튼은 작은 버튼으로 사용하여 주세요 */}
        <Button color="dark" outline size="sm" className="btn-small">
          삭제
        </Button>
        <Button color="dark" outline size="sm">
          사용자 등록
        </Button>
        <Button color="dark" outline size="sm">
          사용자 수정
        </Button>
        <Button color="dark" outline size="sm">
          사용자 삭제 
        </Button>
        </li> 
      </ul>
    </div>
  );
};

export default PostList;
