import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import { displayPermissions } from "../../redux/permissions/permissionActions";
import { addRole } from "../../redux/roles/roleActions";
import FullPageLoader from "../FullPageLoader/fullPageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

const AddRole = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permission?.permissions);

  const [role, setRole] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [errors, setErrors] = useState("");
  const [loader, setLoader] = useState(false);
  const fetched = useSelector((state) => state.permission.fetched);

  const getPermissions = async () => {
    if (permissions) {
      const optionsValue = await permissions.map((permission) => ({
        key: permission._id,
        value: permission._id,
        label: permission.name,
      }));
      setOptions(optionsValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exp = /^[a-z A-Z_]+$/;
    if (role === "") {
      setErrors("Role name is required!");
    } else if (!role.match(exp)) {
      setErrors("Invalid Role name (Only letters a-z allowed)!");
    } else if (selected.length < 1) {
      setErrors("Please Select Permission!");
    } else {
      setLoader(true);
      setErrors("");
      let tempIds = [];
      selected.forEach((item) => {
        tempIds.push(item.key);
      });
      const data = {
        name: role,
        permissionIds: tempIds,
      };
      dispatch(addRole(data));
      setRole("");
      setSelected("");
    }
  };

  useEffect(() => {
    if (fetched) {
      setLoader(false);
    }
  }, [fetched, role]);

  useEffect(() => {
    dispatch(displayPermissions());
  }, []);

  useEffect(() => {
    getPermissions();
  }, [permissions]);

  return (
    <>
      {loader ? (
        <FullPageLoader />
      ) : (
        <div className="col-lg-9 col-md-8">
          <div className="content-wrapper">
            <div className="content-box">
              <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
              <h3>Add Role</h3>
              <form>
                <div className="form-group col-md-12">
                  <label className="control-label">Role</label>
                  <input
                    type="text"
                    required="required"
                    className="form-control"
                    onChange={(e) => setRole(e.target.value)}
                    name="role"
                    value={role}
                    placeholder="Enter role"
                  />
                </div>
                <div className="form-group col-md-12">
                  <div className="form-group col-md-12">
                    <label className="control-label">Select Permissions</label>
                    <MultiSelect
                      name="options"
                      options={options}
                      value={selected}
                      onChange={setSelected}
                      labelledBy="Select"
                    />
                  </div>
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

export default AddRole;
