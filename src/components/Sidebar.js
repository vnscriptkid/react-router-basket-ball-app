import React from "react";
import { Route, Link } from "react-router-dom";
import slug from "slug";
import PropTypes from "prop-types";

const CustomLink = ({ to, children }) => {
  return (
    <Route
      path={to}
      children={({ match }) => (
        <li style={{ fontWeight: match ? "bold" : "normal" }}>
          <Link to={to}>{children}</Link>
        </li>
      )}
    />
  );
};

const Sidebar = ({ title, list, loading, match, location }) => {
  if (loading) {
    return <h2>Loading</h2>;
  }
  return (
    <div>
      <ul>
        <h2>{title}</h2>
        {list.map(name => (
          <CustomLink key={name} to={`${match.url}/${slug(name)}`}>
            {name.toUpperCase()}
          </CustomLink>
        ))}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default Sidebar;
