import { Job } from "../models/jobModel.js";
import { JobApplicationModel } from "../models/jonApplicationModel.js";

export const applyJob = async (req, res) => {
	try {
		const userId = req.id;
		const jobId = req.params.id;
		if (!jobId) {
			return res.status(400).json({
				message: "Job ID is required",
				success: false,
			});
		}

		//Check if job is active
		const job = await Job.findById(jobId)
			.populate({
				path: "createdBy",
			})
			.populate({
				path: "applications",
				populate: {
					path: "applicant",
				},
			});
		if (!job) {
			return res.status(404).json({
				message: "Job not found",
				success: false,
			});
		}

		//Check if already applied or not
		const existingApplication = await JobApplicationModel.findOne({
			job: jobId,
			applicant: userId,
		});
		if (existingApplication) {
			return res.status(400).json({
				message: "You have already applied for this job",
				success: false,
			});
		}

		if (job.position <= 0) {
			return res.status(400).json({
				message: "Job position is already filled",
				success: false,
			});
		}

		const application = await JobApplicationModel.create({
			job: jobId,
			applicant: userId,
		});
		job.applications.push(application._id);
		await job.save();
		return res.status(201).json({
			message: "Application submitted",
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const getAppliedJobs = async (req, res) => {
	try {
		const userId = req.id;
		const applications = await JobApplicationModel.find({ applicant: userId })
			.sort({ createdAt: -1 })
			.populate({
				path: "job",
				options: { sort: { createdAt: -1 } },
				populate: {
					path: "createdBy",
				},
			});
		if (!applications) {
			return res.status(404).json({
				message: "Applications not found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Applications found",
			success: true,
			applications,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

//Recruiter to see no. of applicants
export const getApplicants = async (req, res) => {
	try {
		const jobId = req.params.id;
		if (!jobId) {
			return res.status(400).json({
				message: "Job ID is required",
				success: false,
			});
		}

		const job = await Job.findById(jobId).populate({
			path: "applications",
			options: { sort: { createdAt: -1 } },
			populate: {
				path: "applicant",
				options: { sort: { createdAt: -1 } },
				select: "-password -_id",
			},
		});
		if (!job) {
			return res.status(404).json({
				message: "Job not found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "Applicants found",
			success: true,
			job,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const updateStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const applicationId = req.params.id;
		if (!status) {
			return res.status(400).json({
				message: "Status is required",
				success: false,
			});
		}

		if (!applicationId) {
			return res.status(400).json({
				message: "Application ID is required",
				success: false,
			});
		}

		// find application by application ID
		const application = await JobApplicationModel.findById(applicationId)
			.populate("applicant")
			.populate({
				path: "job",
				options: { sort: { createdAt: -1 } },
				populate: {
					path: "createdBy",
					options: { sort: { createdAt: -1 } },
				},
			});
		if (!application) {
			return res.status(404).json({
				message: "Application not found",
				success: false,
			});
		}

		//update Status
		application.status = status.toLowerCase();
		if (status === "accepted") {
			const job = await Job.findById(application.job._id);
			job.position = job.position - 1;
			await job.save();
			application.job.position = application.job.position - 1;
		}
		await application.save();

		return res.status(200).json({
			message: "Status updated",
			success: true,
			application,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};
