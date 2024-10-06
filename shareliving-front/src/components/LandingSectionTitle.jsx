import { Link } from "react-router-dom";

const LandingSectionTitle = ({ secDesc, secTitle, secGoto }) => {
  return (
    <div className="section-titlebar">
      <p className="section-description">{ secDesc }</p>
      <div className="section-name-bar">
        <h4 className="section-name">{ secTitle }</h4>

        <p className="button-section-more">
          <Link to={ secGoto }>전체 글 보기</Link>
        </p>
      </div>
    </div>
  );
};

export default LandingSectionTitle;