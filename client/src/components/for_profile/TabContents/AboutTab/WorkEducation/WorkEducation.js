// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import DayDropdown from "./DayDropdown/DayDropdown";
import MonthDropdown from "./MonthDropdown/MonthDropdown";
import "./WorkEducation.css";
import YearDropdown from "./YearDropdown/YearDropdown";

const WorkEducation = ({ getProfile }) => {
	// for updating profile
	const { setUpdateProfile } = GetContextApi();

	// for loading animation until doesn't response from server
	const [isLoading, setIsLoading] = useState(false);

	// for add work toggle
	const [addWorkT, setAddWorkT] = useState(false);

	// for add university toggle
	const [addUniversityT, setAddUniversityT] = useState(false);

	// for add college toggle
	const [addCollegeT, setAddCollegeT] = useState(false);

	// for add school toggle
	const [addSchoolT, setAddSchoolT] = useState(false);

	// for checking now currently working here or not
	const [currWork, setCurrWork] = useState(false);

	// for getting input-fields value for work-place
	const [getCompany, setCompany] = useState("");
	const [getPosition, setPosition] = useState("");
	const [getCity, setCity] = useState("");

	// for getting input-fields value for university
	const [getUniName, setUniName] = useState("");
	const [getMajor, setMajor] = useState("");
	const [getLocation, setLocation] = useState("");

	// for getting input-fields value for college
	const [getCollName, setCollName] = useState("");

	// for getting input-fields value for school
	const [getSchName, setSchName] = useState("");

	const [getDescription, setDescription] = useState("");

	// for pick period
	const [fromYear, setFromYear] = useState("");
	const [fromMonth, setFromMonth] = useState("");
	const [fromDay, setFromDay] = useState("");

	const [toYear, setToYear] = useState("");
	const [toMonth, setToMonth] = useState("");
	const [toDay, setToDay] = useState("");

	// for displaying full month-name
	const fullMonth = (value) => {
		if (value === "Jan") {
			return "January";
		} else if (value === "Feb") {
			return "February";
		} else if (value === "Mar") {
			return "March";
		} else if (value === "Apr") {
			return "April";
		} else if (value === "May") {
			return "May";
		} else if (value === "June") {
			return "June";
		} else if (value === "July") {
			return "July";
		} else if (value === "Aug") {
			return "August";
		} else if (value === "Sept") {
			return "September";
		} else if (value === "Oct") {
			return "October";
		} else if (value === "Nov") {
			return "November";
		} else if (value === "Dec") {
			return "December";
		}
	};

	// for option toggle
	const [optionT, setOptionT] = useState("");

	// for getting work-place selected option
	const [selectOp, setSelectOp] = useState({
		name: "",
		value: {
			company: "",
			position: "",
			city: "",
			description: "",
			fromYear: "",
			fromMonth: "",
			fromDay: "",
			toYear: "",
			toMonth: "",
			toDay: ""
		}
	});

	// for getting university selected option
	const [selectUni, setSelectUni] = useState({
		name: "",
		value: {
			university_name: "",
			major: "",
			location: "",
			description: "",
			fromYear: "",
			fromMonth: "",
			fromDay: "",
			toYear: "",
			toMonth: "",
			toDay: ""
		}
	});

	// for getting college selected option
	const [selectColl, setSelectColl] = useState({
		name: "",
		value: {
			college_name: "",
			location: "",
			description: "",
			fromYear: "",
			fromMonth: "",
			fromDay: "",
			toYear: "",
			toMonth: "",
			toDay: ""
		}
	});

	// for getting college selected option
	const [selectSch, setSelectSch] = useState({
		name: "",
		value: {
			school_name: "",
			location: "",
			description: "",
			fromYear: "",
			fromMonth: "",
			fromDay: "",
			toYear: "",
			toMonth: "",
			toDay: ""
		}
	});

	// for assign selected option's values into time-period when work start
	useEffect(() => {
		if (selectOp.name === "Edit") {
			setCompany(selectOp.value.company);
			setPosition(selectOp.value.position);
			setCity(selectOp.value.city);
			setDescription(selectOp.value.description);

			setFromYear(selectOp.value.fromYear);
			setFromMonth(selectOp.value.fromMonth);
			setFromDay(selectOp.value.fromDay);

			setToYear(selectOp.value.toYear);
			setToMonth(selectOp.value.toMonth);
			setToDay(selectOp.value.toDay);
			setCurrWork(selectOp.value.toYear ? false : true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectOp]);
	// for assign selected option's values into time-period when work end

	// for assign selected option's values into time-period when university start
	useEffect(() => {
		if (selectUni.name === "Edit") {
			setUniName(selectUni.value.university_name);
			setMajor(selectUni.value.major);
			setLocation(selectUni.value.location);
			setDescription(selectUni.value.description);

			setFromYear(selectUni.value.fromYear);
			setFromMonth(selectUni.value.fromMonth);
			setFromDay(selectUni.value.fromDay);

			setToYear(selectUni.value.toYear);
			setToMonth(selectUni.value.toMonth);
			setToDay(selectUni.value.toDay);
			setCurrWork(selectUni.value.toYear ? true : false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectUni]);
	// for assign selected option's values into time-period when university end

	// for assign selected option's values into time-period when college start
	useEffect(() => {
		if (selectColl.name === "Edit") {
			setCollName(selectColl.value.college_name);
			setLocation(selectColl.value.location);
			setDescription(selectColl.value.description);

			setFromYear(selectColl.value.fromYear);
			setFromMonth(selectColl.value.fromMonth);
			setFromDay(selectColl.value.fromDay);

			setToYear(selectColl.value.toYear);
			setToMonth(selectColl.value.toMonth);
			setToDay(selectColl.value.toDay);
			setCurrWork(selectColl.value.toYear ? true : false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectColl]);
	// for assign selected option's values into time-period when college end

	// for assign selected option's values into time-period when school start
	useEffect(() => {
		if (selectSch.name === "Edit") {
			setSchName(selectSch.value.school_name);
			setLocation(selectSch.value.location);
			setDescription(selectSch.value.description);

			setFromYear(selectSch.value.fromYear);
			setFromMonth(selectSch.value.fromMonth);
			setFromDay(selectSch.value.fromDay);

			setToYear(selectSch.value.toYear);
			setToMonth(selectSch.value.toMonth);
			setToDay(selectSch.value.toDay);
			setCurrWork(selectSch.value.toYear ? true : false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectSch]);
	// for assign selected option's values into time-period when school end

	// when want to add new work-place start
	useEffect(() => {
		if (addWorkT) {
			setCompany("");
			setPosition("");
			setCity("");
			setDescription("");

			setFromYear("");
			setFromMonth("");
			setFromDay("");

			setToYear("");
			setToMonth("");
			setToDay("");
			setCurrWork(false);
		}
	}, [addWorkT]);
	// when want to add new work-place end

	// when want to add new university start
	useEffect(() => {
		if (addUniversityT) {
			setUniName("");
			setMajor("");
			setLocation("");
			setDescription("");

			setFromYear("");
			setFromMonth("");
			setFromDay("");

			setToYear("");
			setToMonth("");
			setToDay("");
			setCurrWork(false);
		}
	}, [addUniversityT]);
	// when want to add new university end

	// when want to add new college start
	useEffect(() => {
		if (addCollegeT) {
			setCollName("");
			setLocation("");
			setDescription("");

			setFromYear("");
			setFromMonth("");
			setFromDay("");

			setToYear("");
			setToMonth("");
			setToDay("");
			setCurrWork(false);
		}
	}, [addCollegeT]);
	// when want to add new college end

	// when want to add new school start
	useEffect(() => {
		if (addSchoolT) {
			setSchName("");
			setLocation("");
			setDescription("");

			setFromYear("");
			setFromMonth("");
			setFromDay("");

			setToYear("");
			setToMonth("");
			setToDay("");
			setCurrWork(false);
		}
	}, [addSchoolT]);
	// when want to add new school end

	// for close option when click outside withing start
	const workRef = useRef();

	const handleClickOutside = (e) => {
		if (!workRef.current?.contains(e.target)) {
			setOptionT("");
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// for delete popup
	const deleteRef = useRef();

	const handleClickOutsideDel = (e) => {
		if (!deleteRef.current?.contains(e.target)) {
			setSelectOp({
				name: "",
				value: {
					company: "",
					position: "",
					city: "",
					description: "",
					fromYear: "",
					fromMonth: "",
					fromDay: "",
					toYear: "",
					toMonth: "",
					toDay: ""
				}
			});
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideDel);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideDel);
	}, []);
	// for close option when click outside end

	// add work submit on server start
	const addWorkHandler = async () => {
		try {
			setIsLoading(true);

			const workInfo = {
				company: getCompany,
				position: getPosition,
				city: getCity,
				description: getDescription,
				fromYear,
				fromMonth,
				fromDay,
				toYear,
				toMonth,
				toDay
			};

			const response = await fetch(
				`/user/about/add-work?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify(workInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Work-place added successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setAddWorkT(false);
					setCurrWork(false);
					setCompany("");
					setPosition("");
					setCity("");
					setDescription("");
					setFromYear("");
					setFromMonth("");
					setFromDay("");
					setToYear("");
					setToMonth("");
					setFromDay("");
					setIsLoading(false);
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	//add work submit on server end

	// update work submit on server start
	const updateWorkHandler = async () => {
		try {
			setIsLoading(true);

			const workInfo = {
				company: getCompany,
				position: getPosition,
				city: getCity,
				description: getDescription,
				fromYear,
				fromMonth,
				fromDay,
				toYear,
				toMonth,
				toDay
			};

			const response = await fetch(
				`/user/about/update-work?id=${selectOp.value._id}`,
				{
					method: "POST",
					body: JSON.stringify(workInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast("Work-place updated successfully.", {
					position: "top-right",
					theme: "dark",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setAddWorkT(false);
					setCurrWork(false);
					setCompany("");
					setPosition("");
					setCity("");
					setDescription("");
					setFromYear("");
					setFromMonth("");
					setFromDay("");
					setToYear("");
					setToMonth("");
					setFromDay("");
					setIsLoading(false);
					setSelectOp({
						name: "",
						value: {
							company: "",
							position: "",
							city: "",
							description: "",
							fromYear: "",
							fromMonth: "",
							fromDay: "",
							toYear: "",
							toMonth: "",
							toDay: ""
						}
					});
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// update work submit on server end

	// for deleting add-worked start
	const deleteWorkHandler = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(`/user/about/delete-work/${selectOp.value}`);

			const result = await response.json();

			if (response.status === 200) {
				toast("Work-place deleted successfully.", {
					position: "top-right",
					theme: "dark",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setSelectOp({
						name: "",
						value: {
							company: "",
							position: "",
							city: "",
							description: "",
							fromYear: "",
							fromMonth: "",
							fromDay: "",
							toYear: "",
							toMonth: "",
							toDay: ""
						}
					});

					setIsLoading(false);
				}, 2000);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// for deleting add-worked end

	// add university submit on server start
	const addUniHandler = async () => {
		try {
			setIsLoading(true);

			const uniInfo = {
				university_name: getUniName,
				major: getMajor,
				location: getLocation,
				description: getDescription,
				fromYear,
				fromMonth,
				fromDay,
				toYear,
				toMonth,
				toDay
			};

			const response = await fetch(
				`/user/about/add-university?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify(uniInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Added your university info successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setAddUniversityT(false);
					setCurrWork(false);
					setUniName("");
					setMajor("");
					setLocation("");
					setDescription("");
					setFromYear("");
					setFromMonth("");
					setFromDay("");
					setToYear("");
					setToMonth("");
					setFromDay("");
					setIsLoading(false);
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	//add university submit on server end

	// update university submit on server start
	const updateUniHandler = async () => {
		try {
			setIsLoading(true);

			const uniInfo = {
				university_name: getUniName,
				major: getMajor,
				location: getLocation,
				description: getDescription,
				fromYear,
				fromMonth,
				fromDay,
				toYear,
				toMonth,
				toDay
			};

			const response = await fetch(
				`/user/about/update-university?id=${selectUni.value._id}`,
				{
					method: "POST",
					body: JSON.stringify(uniInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast("Updated your university info successfully.", {
					position: "top-right",
					theme: "dark",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setAddUniversityT(false);
					setCurrWork(false);
					setUniName("");
					setMajor("");
					setLocation("");
					setDescription("");
					setFromYear("");
					setFromMonth("");
					setFromDay("");
					setToYear("");
					setToMonth("");
					setFromDay("");
					setIsLoading(false);
					setSelectUni({
						name: "",
						value: {
							university_name: "",
							major: "",
							location: "",
							description: "",
							fromYear: "",
							fromMonth: "",
							fromDay: "",
							toYear: "",
							toMonth: "",
							toDay: ""
						}
					});
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// update university submit on server end

	// for deleting university start
	const deleteUniHandler = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/delete-university/${selectUni.value}`
			);

			const result = await response.json();

			if (response.status === 200) {
				toast("Deleted your university info successfully.", {
					position: "top-right",
					theme: "dark",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setSelectUni({
						name: "",
						value: {
							university_name: "",
							major: "",
							location: "",
							description: "",
							fromYear: "",
							fromMonth: "",
							fromDay: "",
							toYear: "",
							toMonth: "",
							toDay: ""
						}
					});

					setIsLoading(false);
				}, 2000);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// for deleting university end

	// add college submit on server start
	const addCollege = async () => {
		try {
			setIsLoading(true);

			const CollegeInfo = {
				college_name: getCollName,
				location: getLocation,
				description: getDescription,
				fromYear,
				fromMonth,
				fromDay,
				toYear,
				toMonth,
				toDay
			};

			const response = await fetch(
				`/user/about/add-college?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify(CollegeInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Added your college info successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setAddCollegeT(false);
					setCurrWork(false);
					setCollName("");
					setLocation("");
					setDescription("");
					setFromYear("");
					setFromMonth("");
					setFromDay("");
					setToYear("");
					setToMonth("");
					setFromDay("");
					setIsLoading(false);
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	//add college submit on server end

	// update college submit on server start
	const updateCollege = async () => {
		try {
			setIsLoading(true);

			const collegeInfo = {
				college_name: getCollName,
				location: getLocation,
				description: getDescription,
				fromYear,
				fromMonth,
				fromDay,
				toYear,
				toMonth,
				toDay
			};

			const response = await fetch(
				`/user/about/update-college?id=${selectColl.value._id}`,
				{
					method: "POST",
					body: JSON.stringify(collegeInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast("Updated your college info successfully.", {
					position: "top-right",
					theme: "dark",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setAddCollegeT(false);
					setCurrWork(false);
					setCollName("");
					setLocation("");
					setDescription("");
					setFromYear("");
					setFromMonth("");
					setFromDay("");
					setToYear("");
					setToMonth("");
					setFromDay("");
					setIsLoading(false);
					setSelectColl({
						name: "",
						value: {
							college_name: "",
							location: "",
							description: "",
							fromYear: "",
							fromMonth: "",
							fromDay: "",
							toYear: "",
							toMonth: "",
							toDay: ""
						}
					});
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// update college submit on server end

	// for deleting college start
	const deleteCollege = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/delete-college/${selectColl.value}`
			);

			const result = await response.json();

			if (response.status === 200) {
				toast("Deleted your college info successfully.", {
					position: "top-right",
					theme: "dark",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setSelectColl({
						name: "",
						value: {
							college_name: "",
							location: "",
							description: "",
							fromYear: "",
							fromMonth: "",
							fromDay: "",
							toYear: "",
							toMonth: "",
							toDay: ""
						}
					});

					setIsLoading(false);
				}, 2000);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// for deleting college end

	// add school submit on server start
	const addSchool = async () => {
		try {
			setIsLoading(true);

			const schoolInfo = {
				school_name: getSchName,
				location: getLocation,
				description: getDescription,
				fromYear,
				fromMonth,
				fromDay,
				toYear,
				toMonth,
				toDay
			};

			const response = await fetch(
				`/user/about/add-school?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify(schoolInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Added your school info successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setAddSchoolT(false);
					setCurrWork(false);
					setSchName("");
					setLocation("");
					setDescription("");
					setFromYear("");
					setFromMonth("");
					setFromDay("");
					setToYear("");
					setToMonth("");
					setFromDay("");
					setIsLoading(false);
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	//add school submit on server end

	// update school submit on server start
	const updateSchool = async () => {
		try {
			setIsLoading(true);

			const schoolInfo = {
				school_name: getSchName,
				location: getLocation,
				description: getDescription,
				fromYear,
				fromMonth,
				fromDay,
				toYear,
				toMonth,
				toDay
			};

			const response = await fetch(
				`/user/about/update-school?id=${selectSch.value._id}`,
				{
					method: "POST",
					body: JSON.stringify(schoolInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast("Updated your school info successfully.", {
					position: "top-right",
					theme: "dark",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setAddSchoolT(false);
					setCurrWork(false);
					setSchName("");
					setLocation("");
					setDescription("");
					setFromYear("");
					setFromMonth("");
					setFromDay("");
					setToYear("");
					setToMonth("");
					setFromDay("");
					setIsLoading(false);
					setSelectSch({
						name: "",
						value: {
							school_name: "",
							location: "",
							description: "",
							fromYear: "",
							fromMonth: "",
							fromDay: "",
							toYear: "",
							toMonth: "",
							toDay: ""
						}
					});
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// update school submit on server end

	// for deleting school start
	const deleteSchool = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/delete-school/${selectSch.value}`
			);

			const result = await response.json();

			if (response.status === 200) {
				toast("Deleted your school info successfully.", {
					position: "top-right",
					theme: "dark",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setSelectSch({
						name: "",
						value: {
							school_name: "",
							location: "",
							description: "",
							fromYear: "",
							fromMonth: "",
							fromDay: "",
							toYear: "",
							toMonth: "",
							toDay: ""
						}
					});

					setIsLoading(false);
				}, 2000);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// for deleting school end

	return (
		<div className="row m-0">
			<div className="col p-0 work-edu-container">
				{/* work start  */}
				<div className="work-container">
					<h5 className="work-edu-header">Work</h5>

					{!addWorkT && (
						<div
							className="work-edu-add-section"
							onClick={() => {
								setAddWorkT(true);
								setAddUniversityT(false);
								setAddCollegeT(false);
								setAddSchoolT(false);
								setSelectOp({
									name: "",
									value: {
										company: "",
										position: "",
										city: "",
										description: "",
										fromYear: "",
										fromMonth: "",
										fromDay: "",
										toYear: "",
										toMonth: "",
										toDay: ""
									}
								});
							}}
						>
							<i className="bi bi-plus-circle-dotted"></i>
							<p>Add a workplace</p>
						</div>
					)}

					{/* add new work start  */}
					{(addWorkT || selectOp.name === "Edit") && (
						<div className="add-work-fields" ref={deleteRef}>
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Company"
									placeholder="Company"
									onChange={(e) => setCompany(e.target.value)}
									value={getCompany}
								/>
								<label htmlFor="Company">Company *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Position"
									placeholder="Position"
									onChange={(e) => setPosition(e.target.value)}
									value={getPosition}
								/>
								<label htmlFor="Position">Position *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="City/Town"
									placeholder="City/Town"
									onChange={(e) => setCity(e.target.value)}
									value={getCity}
								/>
								<label htmlFor="City/Town">City/Town *</label>
							</div>

							<div className="form-floating">
								<textarea
									className="form-control outline-sty"
									placeholder="Description"
									id="floatingTextarea2"
									style={{ height: "100px" }}
									onChange={(e) => setDescription(e.target.value)}
									value={getDescription}
								></textarea>
								<label htmlFor="floatingTextarea2">Description</label>
							</div>

							<div className="time-period-container">
								<h6>Time Period</h6>

								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										id="flexCheckDefault"
										onClick={() => setCurrWork(!currWork)}
										checked={currWork ? true : false}
										readOnly
									/>

									<label
										className="form-check-label"
										htmlFor="flexCheckDefault"
										id="checkbox-text"
									>
										I currently work here.
									</label>
								</div>

								<div className="pick-time">
									{currWork ? (
										<div id="current-work">
											<span id="from">From</span>
											<YearDropdown getYear={fromYear} setYear={setFromYear} />
											{fromYear && (
												<MonthDropdown
													getMonth={fromMonth}
													setMonth={setFromMonth}
												/>
											)}

											{fromMonth && (
												<DayDropdown getDay={fromDay} setDay={setFromDay} />
											)}
										</div>
									) : (
										<div id="previous-work">
											<YearDropdown getYear={fromYear} setYear={setFromYear} />
											{fromYear && (
												<MonthDropdown
													getMonth={fromMonth}
													setMonth={setFromMonth}
												/>
											)}
											{fromMonth && (
												<DayDropdown getDay={fromDay} setDay={setFromDay} />
											)}
											<span>to</span>{" "}
											<YearDropdown getYear={toYear} setYear={setToYear} />
											{toYear && (
												<MonthDropdown
													getMonth={toMonth}
													setMonth={setToMonth}
												/>
											)}
											{toMonth && (
												<DayDropdown getDay={toDay} setDay={setToDay} />
											)}
										</div>
									)}
								</div>
							</div>

							<div className="work-edu-submit-con">
								<div id="right">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											setAddWorkT(false);
											setCurrWork(false);
											setCompany("");
											setPosition("");
											setCity("");
											setDescription("");
											setFromYear("");
											setFromMonth("");
											setFromDay("");
											setToYear("");
											setToMonth("");
											setFromDay("");
											setIsLoading(false);
											setSelectOp({
												name: "",
												value: {
													company: "",
													position: "",
													city: "",
													description: "",
													fromYear: "",
													fromMonth: "",
													fromDay: "",
													toYear: "",
													toMonth: "",
													toDay: ""
												}
											});
										}}
									>
										Cancel
									</button>

									{(addWorkT || selectOp.name === "Edit") && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={
												selectOp.name === "Edit"
													? updateWorkHandler
													: addWorkHandler
											}
											disabled={
												getCompany && getPosition && getCity && fromYear
													? false
													: true
											}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : selectOp.name === "Edit" ? (
												"Update"
											) : (
												"Submit"
											)}
										</button>
									)}
								</div>
							</div>
						</div>
					)}
					{/* add new work end  */}

					{/* displaying work start  */}
					{getProfile?.work?.length > 0 && (
						<div className="displaying-work">
							{getProfile.work
								.map((value, index) => {
									return (
										<div className="a-work" key={index}>
											<div id="left">
												<i className="fa-solid fa-briefcase"></i>
												<div className="Edit">
													<p id="up">
														<h6>{value.position ? value.position : "Work"}</h6>
														&nbsp;at&nbsp; <h6>{value.company}</h6>
														{value.city && (
															<>
																&nbsp;in&nbsp;<h6>{value?.city}</h6>
															</>
														)}
													</p>

													{value.fromYear && (
														<p id="down">
															{value.fromMonth && (
																<>
																	{fullMonth(value.fromMonth)} {value.fromDay}
																	,&nbsp;&nbsp;
																</>
															)}
															{value.fromYear} &nbsp;to&nbsp;
															{value.toYear ? (
																<>
																	{value.fromMonth && (
																		<>
																			{fullMonth(value.fromMonth)}{" "}
																			{value.fromDay}
																			,&nbsp;&nbsp;
																		</>
																	)}
																	{value.toYear}
																</>
															) : (
																"Present"
															)}
														</p>
													)}
												</div>
											</div>

											<div id="right">
												<div className="option">
													<i
														className="fa-solid fa-ellipsis"
														onClick={() => setOptionT(value._id)}
													></i>

													{optionT === value._id && (
														<ul ref={workRef}>
															<li
																onClick={() => {
																	setOptionT("");
																	setSelectOp({ name: "Details", value });
																	setAddWorkT(false);
																}}
															>
																<i className="fa-solid fa-eye option-icon"></i>{" "}
																Details
															</li>

															<li
																onClick={() => {
																	setOptionT("");
																	setSelectOp({ name: "Edit", value });
																	setAddWorkT(false);
																}}
															>
																<i className="fa-solid fa-pen-to-square option-icon"></i>{" "}
																Edit
															</li>

															<li
																onClick={() => {
																	setOptionT("");
																	setSelectOp({
																		name: "Delete",
																		value: value._id
																	});
																	setAddWorkT(false);
																}}
															>
																<i className="fa-solid fa-trash-can option-icon"></i>{" "}
																Delete
															</li>
														</ul>
													)}
												</div>
											</div>
										</div>
									);
								})
								.reverse()}
						</div>
					)}
					{/* displaying work end */}

					{/* details popup start */}
					{selectOp.name === "Details" && (
						<div className="work-del-popup" ref={workRef}>
							<div
								className="work-del-popup-wrapper"
								data-aos="fade-down"
								ref={deleteRef}
							>
								<div className="conformation-content">
									<h5>Work place details</h5>
									<div className="details">
										<span id="icon">
											<i className="fa-solid fa-briefcase"></i>
										</span>

										<p id="up">
											<h6>
												{selectOp.value.position
													? selectOp.value.position
													: "Work"}
											</h6>
											&nbsp;at&nbsp; <h6>{selectOp.value.company}</h6>
										</p>

										{selectOp.value.fromYear && (
											<p id="down">
												{selectOp.value.fromMonth && (
													<>
														{fullMonth(selectOp.value.fromMonth)}{" "}
														{selectOp.value.fromDay}
														,&nbsp;&nbsp;
													</>
												)}
												{selectOp.value.fromYear} &nbsp;<span id="to">to</span>
												&nbsp;
												{selectOp.value.toYear ? (
													<>
														{selectOp.value.fromMonth && (
															<>
																{fullMonth(selectOp.value.fromMonth)}{" "}
																{selectOp.value.fromDay}
																,&nbsp;&nbsp;
															</>
														)}
														{selectOp.value.toYear}
													</>
												) : (
													"Present"
												)}
											</p>
										)}

										{selectOp.value.city && (
											<div id="city">
												<h6>{selectOp.value?.city}</h6>
											</div>
										)}

										<div id="description">
											{selectOp.value.description && (
												<p>{selectOp.value.description}</p>
											)}
										</div>
									</div>
								</div>

								<div
									className="close-btn-del-popup"
									onClick={() =>
										setSelectOp({
											name: "",
											value: {
												company: "",
												position: "",
												city: "",
												description: "",
												fromYear: "",
												fromMonth: "",
												fromDay: "",
												toYear: "",
												toMonth: "",
												toDay: ""
											}
										})
									}
								>
									<i className="fa-solid fa-x"></i>
								</div>
							</div>
						</div>
					)}
					{/* details popup end */}

					{/* conform popup for delete start  */}
					{selectOp.name === "Delete" && (
						<div className="work-del-popup" ref={workRef}>
							<div
								className="work-del-popup-wrapper"
								data-aos="fade-down"
								ref={deleteRef}
							>
								<div className="conformation-content">
									<h5>Are you sure?</h5>
									<hr />
									<p>
										Are you sure you want to remove this workplace from your
										profile?
									</p>

									<div className="conform-btn">
										<button
											type="button"
											className="btn btn-danger"
											onClick={deleteWorkHandler}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : (
												"Delete"
											)}
										</button>
										<button
											type="button"
											className="btn btn-light"
											onClick={() =>
												setSelectOp({
													name: "",
													value: {
														company: "",
														position: "",
														city: "",
														description: "",
														fromYear: "",
														fromMonth: "",
														fromDay: "",
														toYear: "",
														toMonth: "",
														toDay: ""
													}
												})
											}
										>
											Cancel
										</button>
									</div>
								</div>

								<div
									className="close-btn-del-popup"
									onClick={() =>
										setSelectOp({
											name: "",
											value: {
												company: "",
												position: "",
												city: "",
												description: "",
												fromYear: "",
												fromMonth: "",
												fromDay: "",
												toYear: "",
												toMonth: "",
												toDay: ""
											}
										})
									}
								>
									<i className="fa-solid fa-x"></i>
								</div>
							</div>
						</div>
					)}
					{/* conform popup for delete end */}
				</div>
				{/* work-end  */}

				{/* university start  */}
				<div className="work-container">
					<h5 className="work-edu-header">University</h5>

					{!addUniversityT && (
						<div
							className="work-edu-add-section"
							onClick={() => {
								setAddWorkT(false);
								setAddUniversityT(true);
								setAddCollegeT(false);
								setAddSchoolT(false);
								setSelectUni({
									name: "",
									value: {
										university_name: "",
										major: "",
										location: "",
										description: "",
										fromYear: "",
										fromMonth: "",
										fromDay: "",
										toYear: "",
										toMonth: "",
										toDay: ""
									}
								});
							}}
						>
							<i className="bi bi-plus-circle-dotted"></i>
							<p>Add your university</p>
						</div>
					)}

					{/* add new work start  */}
					{(addUniversityT || selectUni.name === "Edit") && (
						<div className="add-work-fields" ref={deleteRef}>
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="university-name"
									placeholder="University Name"
									onChange={(e) => setUniName(e.target.value)}
									value={getUniName}
								/>
								<label htmlFor="university-name">University Name *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Major"
									placeholder="Major"
									onChange={(e) => setMajor(e.target.value)}
									value={getMajor}
								/>
								<label htmlFor="Major">Major *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Location"
									placeholder="Location"
									onChange={(e) => setLocation(e.target.value)}
									value={getLocation}
								/>
								<label htmlFor="Location">Location *</label>
							</div>

							<div className="form-floating">
								<textarea
									className="form-control outline-sty"
									placeholder="Description"
									id="floatingTextarea2"
									style={{ height: "100px" }}
									onChange={(e) => setDescription(e.target.value)}
									value={getDescription}
								></textarea>
								<label htmlFor="floatingTextarea2">Description</label>
							</div>

							<div className="time-period-container">
								<h6>Time Period</h6>

								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										id="flexCheckDefault1"
										onClick={() => setCurrWork(!currWork)}
										checked={currWork ? true : false}
										readOnly
									/>

									<label
										className="form-check-label"
										htmlFor="flexCheckDefault1"
										id="checkbox-text"
									>
										Graduated
									</label>
								</div>

								<div className="pick-time">
									{!currWork ? (
										<div id="current-work">
											<span id="from">From</span>
											<YearDropdown getYear={fromYear} setYear={setFromYear} />
											{fromYear && (
												<MonthDropdown
													getMonth={fromMonth}
													setMonth={setFromMonth}
												/>
											)}

											{fromMonth && (
												<DayDropdown getDay={fromDay} setDay={setFromDay} />
											)}
										</div>
									) : (
										<div id="previous-work">
											<YearDropdown getYear={fromYear} setYear={setFromYear} />
											{fromYear && (
												<MonthDropdown
													getMonth={fromMonth}
													setMonth={setFromMonth}
												/>
											)}
											{fromMonth && (
												<DayDropdown getDay={fromDay} setDay={setFromDay} />
											)}
											<span>to</span>{" "}
											<YearDropdown getYear={toYear} setYear={setToYear} />
											{toYear && (
												<MonthDropdown
													getMonth={toMonth}
													setMonth={setToMonth}
												/>
											)}
											{toMonth && (
												<DayDropdown getDay={toDay} setDay={setToDay} />
											)}
										</div>
									)}
								</div>
							</div>

							<div className="work-edu-submit-con">
								<div id="right">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											setAddUniversityT(false);
											setCurrWork(false);
											setUniName("");
											setMajor("");
											setLocation("");
											setDescription("");
											setFromYear("");
											setFromMonth("");
											setFromDay("");
											setToYear("");
											setToMonth("");
											setFromDay("");
											setIsLoading(false);
											setSelectUni({
												name: "",
												value: {
													university_name: "",
													major: "",
													location: "",
													description: "",
													fromYear: "",
													fromMonth: "",
													fromDay: "",
													toYear: "",
													toMonth: "",
													toDay: ""
												}
											});
										}}
									>
										Cancel
									</button>

									{(addUniversityT || selectUni.name === "Edit") && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={
												selectUni.name === "Edit"
													? updateUniHandler
													: addUniHandler
											}
											disabled={
												getUniName && getMajor && getLocation && fromYear
													? false
													: true
											}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : selectUni.name === "Edit" ? (
												"Update"
											) : (
												"Submit"
											)}
										</button>
									)}
								</div>
							</div>
						</div>
					)}
					{/* add new work end  */}

					{/* displaying work start  */}
					{getProfile?.university?.length > 0 && (
						<div className="displaying-work">
							{getProfile.university
								.map((value, index) => {
									return (
										<div className="a-work" key={index}>
											<div id="left">
												<i className="fa-solid fa-graduation-cap"></i>
												<div className="Edit">
													<p id="up">
														<h6>{value.major ? value.major : ""}</h6>
														&nbsp;at&nbsp; <h6>{value.university_name}</h6>
														{value.location && (
															<>
																&nbsp;in&nbsp;<h6>{value?.location}</h6>
															</>
														)}
													</p>

													{value.fromYear && (
														<p id="down">
															{value.fromMonth && (
																<>
																	{fullMonth(value.fromMonth)} {value.fromDay}
																	,&nbsp;&nbsp;
																</>
															)}
															{value.fromYear} &nbsp;to&nbsp;
															{value.toYear ? (
																<>
																	{value.fromMonth && (
																		<>
																			{fullMonth(value.fromMonth)}{" "}
																			{value.fromDay}
																			,&nbsp;&nbsp;
																		</>
																	)}
																	{value.toYear}
																</>
															) : (
																"Present"
															)}
														</p>
													)}
												</div>
											</div>

											<div id="right">
												<div className="option">
													<i
														className="fa-solid fa-ellipsis"
														onClick={() => setOptionT(value._id)}
													></i>

													{optionT === value._id && (
														<ul ref={workRef}>
															<li
																onClick={() => {
																	setOptionT("");
																	setSelectUni({ name: "Details", value });
																	setAddUniversityT(false);
																}}
															>
																<i className="fa-solid fa-eye option-icon"></i>{" "}
																Details
															</li>

															<li
																onClick={() => {
																	setOptionT("");
																	setSelectUni({ name: "Edit", value });
																	setAddUniversityT(false);
																}}
															>
																<i className="fa-solid fa-pen-to-square option-icon"></i>{" "}
																Edit
															</li>

															<li
																onClick={() => {
																	setOptionT("");
																	setSelectUni({
																		name: "Delete",
																		value: value._id
																	});
																	setAddUniversityT(false);
																}}
															>
																<i className="fa-solid fa-trash-can option-icon"></i>{" "}
																Delete
															</li>
														</ul>
													)}
												</div>
											</div>
										</div>
									);
								})
								.reverse()}
						</div>
					)}
					{/* displaying work end */}

					{/* details popup start */}
					{selectUni.name === "Details" && (
						<div className="work-del-popup" ref={workRef}>
							<div
								className="work-del-popup-wrapper"
								data-aos="fade-down"
								ref={deleteRef}
							>
								<div className="conformation-content">
									<h5>University details</h5>
									<div className="details">
										<span id="icon">
											<i className="fa-solid fa-graduation-cap"></i>
										</span>

										<p id="up">
											<h6>
												{selectUni.value.major ? selectUni.value.major : ""}
											</h6>
											&nbsp;at&nbsp; <h6>{selectUni.value.university_name}</h6>
										</p>

										{selectUni.value.fromYear && (
											<p id="down">
												{selectUni.value.fromMonth && (
													<>
														{fullMonth(selectUni.value.fromMonth)}{" "}
														{selectUni.value.fromDay}
														,&nbsp;&nbsp;
													</>
												)}
												{selectUni.value.fromYear} &nbsp;<span id="to">to</span>
												&nbsp;
												{selectUni.value.toYear ? (
													<>
														{selectUni.value.fromMonth && (
															<>
																{fullMonth(selectUni.value.fromMonth)}{" "}
																{selectUni.value.fromDay}
																,&nbsp;&nbsp;
															</>
														)}
														{selectUni.value.toYear}
													</>
												) : (
													"Present"
												)}
											</p>
										)}

										{selectUni.value.location && (
											<div id="city">
												<h6>{selectUni.value?.location}</h6>
											</div>
										)}

										<div id="description">
											{selectUni.value.description && (
												<p>{selectUni.value.description}</p>
											)}
										</div>
									</div>
								</div>

								<div
									className="close-btn-del-popup"
									onClick={() =>
										setSelectUni({
											name: "",
											value: {
												university_name: "",
												major: "",
												location: "",
												description: "",
												fromYear: "",
												fromMonth: "",
												fromDay: "",
												toYear: "",
												toMonth: "",
												toDay: ""
											}
										})
									}
								>
									<i className="fa-solid fa-x"></i>
								</div>
							</div>
						</div>
					)}
					{/* details popup end */}

					{/* conform popup for delete start  */}
					{selectUni.name === "Delete" && (
						<div className="work-del-popup" ref={workRef}>
							<div
								className="work-del-popup-wrapper"
								data-aos="fade-down"
								ref={deleteRef}
							>
								<div className="conformation-content">
									<h5>Are you sure?</h5>
									<hr />
									<p>
										Are you sure you want to remove this university from your
										profile?
									</p>

									<div className="conform-btn">
										<button
											type="button"
											className="btn btn-danger"
											onClick={deleteUniHandler}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : (
												"Delete"
											)}
										</button>
										<button
											type="button"
											className="btn btn-light"
											onClick={() =>
												setSelectUni({
													name: "",
													value: {
														university_name: "",
														major: "",
														location: "",
														description: "",
														fromYear: "",
														fromMonth: "",
														fromDay: "",
														toYear: "",
														toMonth: "",
														toDay: ""
													}
												})
											}
										>
											Cancel
										</button>
									</div>
								</div>

								<div
									className="close-btn-del-popup"
									onClick={() =>
										setSelectUni({
											name: "",
											value: {
												university_name: "",
												major: "",
												location: "",
												description: "",
												fromYear: "",
												fromMonth: "",
												fromDay: "",
												toYear: "",
												toMonth: "",
												toDay: ""
											}
										})
									}
								>
									<i className="fa-solid fa-x"></i>
								</div>
							</div>
						</div>
					)}
					{/* conform popup for delete end */}
				</div>
				{/* university end  */}

				{/* college start  */}
				<div className="work-container">
					<h5 className="work-edu-header">College</h5>

					{!addCollegeT && (
						<div
							className="work-edu-add-section"
							onClick={() => {
								setAddWorkT(false);
								setAddUniversityT(false);
								setAddCollegeT(true);
								setAddSchoolT(false);
								setSelectColl({
									name: "",
									value: {
										college_name: "",
										location: "",
										description: "",
										fromYear: "",
										fromMonth: "",
										fromDay: "",
										toYear: "",
										toMonth: "",
										toDay: ""
									}
								});
							}}
						>
							<i className="bi bi-plus-circle-dotted"></i>
							<p>Add your college</p>
						</div>
					)}

					{/* add new work start  */}
					{(addCollegeT || selectColl.name === "Edit") && (
						<div className="add-work-fields" ref={deleteRef}>
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="College-name"
									placeholder="College Name"
									onChange={(e) => setCollName(e.target.value)}
									value={getCollName}
								/>
								<label htmlFor="College-name">College Name *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Location"
									placeholder="Location"
									onChange={(e) => setLocation(e.target.value)}
									value={getLocation}
								/>
								<label htmlFor="Location">Location *</label>
							</div>

							<div className="form-floating">
								<textarea
									className="form-control outline-sty"
									placeholder="Description"
									id="floatingTextarea2"
									style={{ height: "100px" }}
									onChange={(e) => setDescription(e.target.value)}
									value={getDescription}
								></textarea>
								<label htmlFor="floatingTextarea2">Description</label>
							</div>

							<div className="time-period-container">
								<h6>Time Period</h6>

								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										id="flexCheckDefault2"
										onClick={() => setCurrWork(!currWork)}
										checked={currWork ? true : false}
										readOnly
									/>

									<label
										className="form-check-label"
										htmlFor="flexCheckDefault2"
										id="checkbox-text"
									>
										Graduated
									</label>
								</div>

								<div className="pick-time">
									{!currWork ? (
										<div id="current-work">
											<span id="from">From</span>
											<YearDropdown getYear={fromYear} setYear={setFromYear} />
											{fromYear && (
												<MonthDropdown
													getMonth={fromMonth}
													setMonth={setFromMonth}
												/>
											)}

											{fromMonth && (
												<DayDropdown getDay={fromDay} setDay={setFromDay} />
											)}
										</div>
									) : (
										<div id="previous-work">
											<YearDropdown getYear={fromYear} setYear={setFromYear} />
											{fromYear && (
												<MonthDropdown
													getMonth={fromMonth}
													setMonth={setFromMonth}
												/>
											)}
											{fromMonth && (
												<DayDropdown getDay={fromDay} setDay={setFromDay} />
											)}
											<span>to</span>{" "}
											<YearDropdown getYear={toYear} setYear={setToYear} />
											{toYear && (
												<MonthDropdown
													getMonth={toMonth}
													setMonth={setToMonth}
												/>
											)}
											{toMonth && (
												<DayDropdown getDay={toDay} setDay={setToDay} />
											)}
										</div>
									)}
								</div>
							</div>

							<div className="work-edu-submit-con">
								<div id="right">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											setAddCollegeT(false);
											setCurrWork(false);
											setCollName("");
											setLocation("");
											setDescription("");
											setFromYear("");
											setFromMonth("");
											setFromDay("");
											setToYear("");
											setToMonth("");
											setFromDay("");
											setIsLoading(false);
											setSelectColl({
												name: "",
												value: {
													college_name: "",
													location: "",
													description: "",
													fromYear: "",
													fromMonth: "",
													fromDay: "",
													toYear: "",
													toMonth: "",
													toDay: ""
												}
											});
										}}
									>
										Cancel
									</button>

									{(addCollegeT || selectColl.name === "Edit") && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={
												selectColl.name === "Edit" ? updateCollege : addCollege
											}
											disabled={
												getCollName && getLocation && fromYear ? false : true
											}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : selectColl.name === "Edit" ? (
												"Update"
											) : (
												"Submit"
											)}
										</button>
									)}
								</div>
							</div>
						</div>
					)}
					{/* add new work end  */}

					{/* displaying work start  */}
					{getProfile?.college?.length > 0 && (
						<div className="displaying-work">
							{getProfile.college
								.map((value, index) => {
									return (
										<div className="a-work" key={index}>
											<div id="left">
												<i className="fa-solid fa-graduation-cap"></i>
												<div className="Edit">
													<p id="up">
														{value.toYear ? "Studied" : "Studies"}
														&nbsp;at&nbsp; <h6>{value.college_name}</h6>
														{value.location && (
															<>
																&nbsp;in&nbsp;<h6>{value?.location}</h6>
															</>
														)}
													</p>

													{value.fromYear && (
														<p id="down">
															{value.fromMonth && (
																<>
																	{fullMonth(value.fromMonth)} {value.fromDay}
																	,&nbsp;&nbsp;
																</>
															)}
															{value.fromYear} &nbsp;to&nbsp;
															{value.toYear ? (
																<>
																	{value.fromMonth && (
																		<>
																			{fullMonth(value.fromMonth)}{" "}
																			{value.fromDay}
																			,&nbsp;&nbsp;
																		</>
																	)}
																	{value.toYear}
																</>
															) : (
																"Present"
															)}
														</p>
													)}
												</div>
											</div>

											<div id="right">
												<div className="option">
													<i
														className="fa-solid fa-ellipsis"
														onClick={() => setOptionT(value._id)}
													></i>

													{optionT === value._id && (
														<ul ref={workRef}>
															<li
																onClick={() => {
																	setOptionT("");
																	setSelectColl({ name: "Details", value });
																	setAddCollegeT(false);
																}}
															>
																<i className="fa-solid fa-eye option-icon"></i>{" "}
																Details
															</li>

															<li
																onClick={() => {
																	setOptionT("");
																	setSelectColl({ name: "Edit", value });
																	setAddCollegeT(false);
																}}
															>
																<i className="fa-solid fa-pen-to-square option-icon"></i>{" "}
																Edit
															</li>

															<li
																onClick={() => {
																	setOptionT("");
																	setSelectColl({
																		name: "Delete",
																		value: value._id
																	});
																	setAddCollegeT(false);
																}}
															>
																<i className="fa-solid fa-trash-can option-icon"></i>{" "}
																Delete
															</li>
														</ul>
													)}
												</div>
											</div>
										</div>
									);
								})
								.reverse()}
						</div>
					)}
					{/* displaying work end */}

					{/* details popup start */}
					{selectColl.name === "Details" && (
						<div className="work-del-popup" ref={workRef}>
							<div
								className="work-del-popup-wrapper"
								data-aos="fade-down"
								ref={deleteRef}
							>
								<div className="conformation-content">
									<h5>College details</h5>
									<div className="details">
										<span id="icon">
											<i className="fa-solid fa-graduation-cap"></i>
										</span>

										<p id="up">
											{selectColl.value.toYear ? "Studied" : "Studies"}
											&nbsp;at&nbsp; <h6>{selectColl.value.college_name}</h6>
										</p>

										{selectColl.value.fromYear && (
											<p id="down">
												{selectColl.value.fromMonth && (
													<>
														{fullMonth(selectColl.value.fromMonth)}{" "}
														{selectColl.value.fromDay}
														,&nbsp;&nbsp;
													</>
												)}
												{selectColl.value.fromYear} &nbsp;
												<span id="to">to</span>
												&nbsp;
												{selectColl.value.toYear ? (
													<>
														{selectColl.value.fromMonth && (
															<>
																{fullMonth(selectColl.value.fromMonth)}{" "}
																{selectColl.value.fromDay}
																,&nbsp;&nbsp;
															</>
														)}
														{selectColl.value.toYear}
													</>
												) : (
													"Present"
												)}
											</p>
										)}

										{selectColl.value.location && (
											<div id="city">
												<h6>{selectColl.value?.location}</h6>
											</div>
										)}

										<div id="description">
											{selectColl.value.description && (
												<p>{selectColl.value.description}</p>
											)}
										</div>
									</div>
								</div>

								<div
									className="close-btn-del-popup"
									onClick={() =>
										setSelectColl({
											name: "",
											value: {
												college_name: "",
												location: "",
												description: "",
												fromYear: "",
												fromMonth: "",
												fromDay: "",
												toYear: "",
												toMonth: "",
												toDay: ""
											}
										})
									}
								>
									<i className="fa-solid fa-x"></i>
								</div>
							</div>
						</div>
					)}
					{/* details popup end */}

					{/* conform popup for delete start  */}
					{selectColl.name === "Delete" && (
						<div className="work-del-popup" ref={workRef}>
							<div
								className="work-del-popup-wrapper"
								data-aos="fade-down"
								ref={deleteRef}
							>
								<div className="conformation-content">
									<h5>Are you sure?</h5>
									<hr />
									<p>
										Are you sure you want to remove this college from your
										profile?
									</p>

									<div className="conform-btn">
										<button
											type="button"
											className="btn btn-danger"
											onClick={deleteCollege}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : (
												"Delete"
											)}
										</button>
										<button
											type="button"
											className="btn btn-light"
											onClick={() =>
												setSelectColl({
													name: "",
													value: {
														college_name: "",
														location: "",
														description: "",
														fromYear: "",
														fromMonth: "",
														fromDay: "",
														toYear: "",
														toMonth: "",
														toDay: ""
													}
												})
											}
										>
											Cancel
										</button>
									</div>
								</div>

								<div
									className="close-btn-del-popup"
									onClick={() =>
										setSelectColl({
											name: "",
											value: {
												college_name: "",
												location: "",
												description: "",
												fromYear: "",
												fromMonth: "",
												fromDay: "",
												toYear: "",
												toMonth: "",
												toDay: ""
											}
										})
									}
								>
									<i className="fa-solid fa-x"></i>
								</div>
							</div>
						</div>
					)}
					{/* conform popup for delete end */}
				</div>
				{/* college end */}

				{/* school start  */}
				<div className="work-container">
					<h5 className="work-edu-header">School</h5>

					{!addSchoolT && (
						<div
							className="work-edu-add-section"
							onClick={() => {
								setAddWorkT(false);
								setAddUniversityT(false);
								setAddCollegeT(false);
								setAddSchoolT(true);
								setSelectSch({
									name: "",
									value: {
										school_name: "",
										location: "",
										description: "",
										fromYear: "",
										fromMonth: "",
										fromDay: "",
										toYear: "",
										toMonth: "",
										toDay: ""
									}
								});
							}}
						>
							<i className="bi bi-plus-circle-dotted"></i>
							<p>Add your school</p>
						</div>
					)}

					{/* add new school start  */}
					{(addSchoolT || selectSch.name === "Edit") && (
						<div className="add-work-fields" ref={deleteRef}>
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="School-name"
									placeholder="School Name"
									onChange={(e) => setSchName(e.target.value)}
									value={getSchName}
								/>
								<label htmlFor="School-name">School Name *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Location"
									placeholder="Location"
									onChange={(e) => setLocation(e.target.value)}
									value={getLocation}
								/>
								<label htmlFor="Location">Location *</label>
							</div>

							<div className="form-floating">
								<textarea
									className="form-control outline-sty"
									placeholder="Description"
									id="floatingTextarea2"
									style={{ height: "100px" }}
									onChange={(e) => setDescription(e.target.value)}
									value={getDescription}
								></textarea>
								<label htmlFor="floatingTextarea2">Description</label>
							</div>

							<div className="time-period-container">
								<h6>Time Period</h6>

								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										id="flexCheckDefault3"
										onClick={() => setCurrWork(!currWork)}
										checked={currWork ? true : false}
										readOnly
									/>

									<label
										className="form-check-label"
										htmlFor="flexCheckDefault3"
										id="checkbox-text"
									>
										Graduated
									</label>
								</div>

								<div className="pick-time">
									{!currWork ? (
										<div id="current-work">
											<span id="from">From</span>
											<YearDropdown getYear={fromYear} setYear={setFromYear} />
											{fromYear && (
												<MonthDropdown
													getMonth={fromMonth}
													setMonth={setFromMonth}
												/>
											)}

											{fromMonth && (
												<DayDropdown getDay={fromDay} setDay={setFromDay} />
											)}
										</div>
									) : (
										<div id="previous-work">
											<YearDropdown getYear={fromYear} setYear={setFromYear} />
											{fromYear && (
												<MonthDropdown
													getMonth={fromMonth}
													setMonth={setFromMonth}
												/>
											)}
											{fromMonth && (
												<DayDropdown getDay={fromDay} setDay={setFromDay} />
											)}
											<span>to</span>{" "}
											<YearDropdown getYear={toYear} setYear={setToYear} />
											{toYear && (
												<MonthDropdown
													getMonth={toMonth}
													setMonth={setToMonth}
												/>
											)}
											{toMonth && (
												<DayDropdown getDay={toDay} setDay={setToDay} />
											)}
										</div>
									)}
								</div>
							</div>

							<div className="work-edu-submit-con">
								<div id="right">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											setAddSchoolT(false);
											setCurrWork(false);
											setSchName("");
											setLocation("");
											setDescription("");
											setFromYear("");
											setFromMonth("");
											setFromDay("");
											setToYear("");
											setToMonth("");
											setFromDay("");
											setIsLoading(false);
											setSelectSch({
												name: "",
												value: {
													school_name: "",
													location: "",
													description: "",
													fromYear: "",
													fromMonth: "",
													fromDay: "",
													toYear: "",
													toMonth: "",
													toDay: ""
												}
											});
										}}
									>
										Cancel
									</button>

									{(addSchoolT || selectSch.name === "Edit") && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={
												selectSch.name === "Edit" ? updateSchool : addSchool
											}
											disabled={
												getSchName && getLocation && fromYear ? false : true
											}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : selectSch.name === "Edit" ? (
												"Update"
											) : (
												"Submit"
											)}
										</button>
									)}
								</div>
							</div>
						</div>
					)}
					{/* add new school end  */}

					{/* displaying school start  */}
					{getProfile?.school?.length > 0 && (
						<div className="displaying-work">
							{getProfile.school
								.map((value, index) => {
									return (
										<div className="a-work" key={index}>
											<div id="left">
												<i className="fa-solid fa-graduation-cap"></i>
												<div className="Edit">
													<p id="up">
														{value.toYear ? "Studied" : "Studies"}
														&nbsp;at&nbsp; <h6>{value.school_name}</h6>
														{value.location && (
															<>
																&nbsp;in&nbsp;<h6>{value?.location}</h6>
															</>
														)}
													</p>

													{value.fromYear && (
														<p id="down">
															{value.fromMonth && (
																<>
																	{fullMonth(value.fromMonth)} {value.fromDay}
																	,&nbsp;&nbsp;
																</>
															)}
															{value.fromYear} &nbsp;to&nbsp;
															{value.toYear ? (
																<>
																	{value.fromMonth && (
																		<>
																			{fullMonth(value.fromMonth)}{" "}
																			{value.fromDay}
																			,&nbsp;&nbsp;
																		</>
																	)}
																	{value.toYear}
																</>
															) : (
																"Present"
															)}
														</p>
													)}
												</div>
											</div>

											<div id="right">
												<div className="option">
													<i
														className="fa-solid fa-ellipsis"
														onClick={() => setOptionT(value._id)}
													></i>

													{optionT === value._id && (
														<ul ref={workRef}>
															<li
																onClick={() => {
																	setOptionT("");
																	setSelectSch({ name: "Details", value });
																	setAddSchoolT(false);
																}}
															>
																<i className="fa-solid fa-eye option-icon"></i>{" "}
																Details
															</li>

															<li
																onClick={() => {
																	setOptionT("");
																	setSelectSch({ name: "Edit", value });
																	setAddSchoolT(false);
																}}
															>
																<i className="fa-solid fa-pen-to-square option-icon"></i>{" "}
																Edit
															</li>

															<li
																onClick={() => {
																	setOptionT("");
																	setSelectSch({
																		name: "Delete",
																		value: value._id
																	});
																	setAddSchoolT(false);
																}}
															>
																<i className="fa-solid fa-trash-can option-icon"></i>{" "}
																Delete
															</li>
														</ul>
													)}
												</div>
											</div>
										</div>
									);
								})
								.reverse()}
						</div>
					)}
					{/* displaying school end */}

					{/* details popup start */}
					{selectSch.name === "Details" && (
						<div className="work-del-popup" ref={workRef}>
							<div
								className="work-del-popup-wrapper"
								data-aos="fade-down"
								ref={deleteRef}
							>
								<div className="conformation-content">
									<h5>School details</h5>
									<div className="details">
										<span id="icon">
											<i className="fa-solid fa-graduation-cap"></i>
										</span>

										<p id="up">
											{selectSch.value.toYear ? "Studied" : "Studies"}
											&nbsp;at&nbsp; <h6>{selectSch.value.school_name}</h6>
										</p>

										{selectSch.value.fromYear && (
											<p id="down">
												{selectSch.value.fromMonth && (
													<>
														{fullMonth(selectSch.value.fromMonth)}{" "}
														{selectSch.value.fromDay}
														,&nbsp;&nbsp;
													</>
												)}
												{selectSch.value.fromYear} &nbsp;
												<span id="to">to</span>
												&nbsp;
												{selectSch.value.toYear ? (
													<>
														{selectSch.value.fromMonth && (
															<>
																{fullMonth(selectSch.value.fromMonth)}{" "}
																{selectSch.value.fromDay}
																,&nbsp;&nbsp;
															</>
														)}
														{selectSch.value.toYear}
													</>
												) : (
													"Present"
												)}
											</p>
										)}

										{selectSch.value.location && (
											<div id="city">
												<h6>{selectSch.value?.location}</h6>
											</div>
										)}

										<div id="description">
											{selectSch.value.description && (
												<p>{selectSch.value.description}</p>
											)}
										</div>
									</div>
								</div>

								<div
									className="close-btn-del-popup"
									onClick={() =>
										setSelectSch({
											name: "",
											value: {
												school_name: "",
												location: "",
												description: "",
												fromYear: "",
												fromMonth: "",
												fromDay: "",
												toYear: "",
												toMonth: "",
												toDay: ""
											}
										})
									}
								>
									<i className="fa-solid fa-x"></i>
								</div>
							</div>
						</div>
					)}
					{/* details popup end */}

					{/* conform popup for delete start  */}
					{selectSch.name === "Delete" && (
						<div className="work-del-popup" ref={workRef}>
							<div
								className="work-del-popup-wrapper"
								data-aos="fade-down"
								ref={deleteRef}
							>
								<div className="conformation-content">
									<h5>Are you sure?</h5>
									<hr />
									<p>
										Are you sure you want to remove this school from your
										profile?
									</p>

									<div className="conform-btn">
										<button
											type="button"
											className="btn btn-danger"
											onClick={deleteSchool}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : (
												"Delete"
											)}
										</button>
										<button
											type="button"
											className="btn btn-light"
											onClick={() =>
												setSelectSch({
													name: "",
													value: {
														school_name: "",
														location: "",
														description: "",
														fromYear: "",
														fromMonth: "",
														fromDay: "",
														toYear: "",
														toMonth: "",
														toDay: ""
													}
												})
											}
										>
											Cancel
										</button>
									</div>
								</div>

								<div
									className="close-btn-del-popup"
									onClick={() =>
										setSelectSch({
											name: "",
											value: {
												school_name: "",
												location: "",
												description: "",
												fromYear: "",
												fromMonth: "",
												fromDay: "",
												toYear: "",
												toMonth: "",
												toDay: ""
											}
										})
									}
								>
									<i className="fa-solid fa-x"></i>
								</div>
							</div>
						</div>
					)}
					{/* conform popup for delete end */}
				</div>
				{/* school end  */}
			</div>
		</div>
	);
};

export default WorkEducation;
