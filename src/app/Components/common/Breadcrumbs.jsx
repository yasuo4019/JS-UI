import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// 将路径名转换为面包屑的显示文本
const makeBreadcrumbText = (pathSlug) => {
  // 一个简单的映射，用于将路径转换为更友好的文本
  const slugToText = {
    'view': 'View',
    'analyses': 'Analyses',
    'about': 'About Us',  // 添加了正确的映射
    'contacts': 'Contacts',
    // 更多映射...
  };
  return slugToText[pathSlug] || capitalize(pathSlug.replace(/-/g, ' '));
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const text = makeBreadcrumbText(value);
        return last ? (
          <Breadcrumb.Item active key={to}>{text}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to }} key={to}>{text}</Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
