import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const BreadCrumb = (props) => {
  let breadcrumItems = [];
  if (props.breadcrumbPath !== undefined) {
    breadcrumItems = props.breadcrumbPath.map((path, index) => {
      if (path === "Dashboard") {
        return <BreadcrumbItem key={index}><a href="/" >{path}</a> </BreadcrumbItem>;
      }
      return <BreadcrumbItem key={index} active>{path}</BreadcrumbItem>;
    });
  }

  return (
    <div>
      <Breadcrumb>
        {breadcrumItems}
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
