import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';


// const DynamicBreadcrumbs = ({ onBreadcrumbClick }) => {
//     const location = useLocation();
//     const pathnames = location.pathname.split('/').filter(x => x);
//     return (
//         <Breadcrumb>
//             <LinkContainer to="/">
//                 <Breadcrumb.Item>Home</Breadcrumb.Item>
//             </LinkContainer>
//             {pathnames.map((value, index) => {
//                 const last = index === pathnames.length - 1;
//                 const to = `/${pathnames.slice(0, index + 1).join('/')}`;

//                 return last ? (
//                     <Breadcrumb.Item active key={to} onClick={() => onBreadcrumbClick(value)}>
//                         {value}
//                     </Breadcrumb.Item>
//                 ) : (
//                     <LinkContainer to={to} key={to}>
//                         <Breadcrumb.Item>{value}</Breadcrumb.Item>
//                     </LinkContainer>
//                 );
//             })}
//         </Breadcrumb>
//     );
// };
const DynamicBreadcrumbs = ({ onBreadcrumbClick }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    
    // These paths should not be clickable.
    const nonClickablePaths = ['view', 'table','result'];

    return (
        <Breadcrumb>
            <LinkContainer to="/">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isNonClickable = nonClickablePaths.includes(value.toLowerCase());

                return isNonClickable || last ? (
                    <Breadcrumb.Item active key={to}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Breadcrumb.Item>
                ) : (
                    <LinkContainer to={to} key={to}>
                        <Breadcrumb.Item>{value.charAt(0).toUpperCase() + value.slice(1)}</Breadcrumb.Item>
                    </LinkContainer>
                );
            })}
        </Breadcrumb>
    );
};


export default DynamicBreadcrumbs;
