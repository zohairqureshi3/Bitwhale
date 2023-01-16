import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPermission } from "../../redux/permissions/permissionActions";
import FullPageLoader from "../FullPageLoader/fullPageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

const AddPermission = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState("");
  const [loader, setLoader] = useState(false);
  const fetched = useSelector((state) => state.permission.fetched);

  const handleSubmit = (e) => {
    e.preventDefault();
    const exp = /^[a-z A-Z_]+$/;
    if (name === "") {
      setErrors("Permission name is required!");
    } else if (!name.match(exp)) {
      setErrors("Invalid Permission name (Only letters a-z allowed)!");
    } else {
      setLoader(true);
      setErrors("");
      const data = { name: name };
      dispatch(addPermission(data));
      setName("");
    }
  };

  useEffect(() => {
    if (fetched) {
      setLoader(false);
    }
  }, [fetched, name]);

  return (
    <>
      {loader ? (
        <FullPageLoader />
      ) : (
        <div className="col-lg-9 col-md-8">
          <div className="content-wrapper">
            <div className="content-box">
              <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
              <h3>Add Permission</h3>
              <form>
                <div className="form-group col-md-12">
                  <label className="control-label">Permission</label>
                  <input
                    type="text"
                    required="required"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    value={name}
                    placeholder="Enter Permission"
                  />
                </div>
                {errors ? (
                  <div
                    style={{ color: "#FE6E00" }}
                    className="alert alert-danger"
                  >
                    {" "}
                    {errors}{" "}
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <button
                    className="btn-default hvr-bounce-in nav-button"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPermission;
