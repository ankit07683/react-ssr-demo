import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import appRoutes from "../../Router/routes.json";

function BlogListRow(props) {
  const {
    title,
    meta_title,
    meta_description,
    meta_image,
    author,
    image,
    body,
    createdAt,
    updatedAt,
    url,
  } = props;

  return (
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <strong className="d-inline-block mb-2 text-success">Design</strong>
        <h3 className="mb-0">Post title</h3>
        <div className="mb-1 text-muted">Nov 11</div>
        <p className="mb-auto">
          This is a wider card with supporting text below as a natural lead-in
          to additional content.
        </p>

        <Link to={`${appRoutes.BLOGS}/${url}`} className="stretched-link">
          Continue reading
        </Link>
      </div>
      <div className="col-auto d-none d-lg-block">
        <svg
          className="bd-placeholder-img"
          width="200"
          height="250"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c" />
          <text x="50%" y="50%" fill="#eceeef" dy=".3em">
            Thumbnail
          </text>
        </svg>
      </div>
    </div>
  );
}

BlogListRow.propTypes = {
  title: PropTypes.string.isRequired,
  meta_title: PropTypes.string.isRequired,
  meta_description: PropTypes.string.isRequired,
  meta_image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  updatedAt: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

BlogListRow.defaultProps = {
  title: "Dummy Blog 1 | SSR DEMO",
  meta_title: "Hi, this is the meta title for Dummy Blog 1",
  meta_description: "Hi, this is the meta description for Dummy Blog 1",
  meta_image: "Dummy Blog 1 | SSR DEMO",
  author: "Ankit Kumar Jain",
  image: "blog-1.jpeg",
  body: "<div id='Panes'><div><h2>Dummy Blog 1</h2><p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div><div><h2>Why do we use it?</h2><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div><br><div><h2>Where does it come from?</h2><p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.</p><p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p></div><div><h2>Where can I get some?</h2><p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>",
  createdAt: "1634015908938",
  updatedAt: "1634015908938",
  url: "dummy-blog-1",
};

export default React.memo(BlogListRow);
