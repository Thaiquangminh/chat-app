const GenderCheckbox = ({ onChangeCheckBox, gender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900 checkbox-sm"
            onChange={() => onChangeCheckBox("male")}
            checked={gender === "male"}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900 checkbox-sm"
            onChange={() => onChangeCheckBox("female")}
            checked={gender === "female"}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
