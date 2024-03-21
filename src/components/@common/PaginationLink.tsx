import { PropsWithChildren } from 'react';
import queryString from 'query-string';
import { Link, useLocation } from 'react-router-dom';


type PaginationLinkProps = {
    page?: number;
    disabled?: boolean;
    active?: boolean;
} & PropsWithChildren

const PaginationLink = ({ page, disabled, active, children }: PaginationLinkProps) => {
    const location = useLocation();
    const params = location.search;
    const path = location.pathname;
    const limit = 10;
    const skip = page ? (Number(page) - 1) * limit : 0; 

    let currentQuery = {};
    if(params) {
        currentQuery = queryString.parse(params?.toString())
    }
    const updatedQuery = {
        ...currentQuery, 
        page,
        skip
    }

  return (
    <Link
      to={`${path}?${queryString.stringify(updatedQuery)}`} 
      className={`p-2 text-xl 
      ${active ? "font-bold text-black" :""}
      ${disabled ? "pointer-events-none text-gray-200" : ""}
      `}
    >{children}</Link>
  )
}

export default PaginationLink