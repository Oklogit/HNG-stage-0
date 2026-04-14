import express from "express";
import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
    const name = req.query.name;

    if (!name || name.trim() === "") {
        return res
            .status(400)
            .json({ status: "error", message: "400 Bad Request" });
    } else if (typeof name !== "string") {
        return res
            .status(422)
            .json({ status: "error", message: "422 Unprocessable Entity" });
    }
    try {
        const response = await fetch(`https://api.genderize.io?name=${name}`);
        const data = await response.json();
        if (data.count === 0 || data.gender === null) {
            return res.json({
                status: "error",
                message: "No prediction available for the provided name",
            });
        }
        const { gender, probability } = data;
        const { count: sampleSize } = data;
        const isConfident =
            data.probability >= 0.7 && sampleSize >= 100 ? true : false;
        const processedAt = new Date().toISOString();
        return res.status(200).json({
            status: "success",
            data: {
                name: data.name,
                gender: gender,
                probability: probability,
                sample_size: sampleSize,
                is_confident: isConfident,
                processed_at: processedAt,
            },
        });
    } catch (error) {
        return res
            .status(502)
            .json({ status: "error", message: "Upstream or server failure" });
    }
});

export default router;
