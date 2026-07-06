router.post("/add", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const food = new Food({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
    });

    await food.save();

    console.log("SAVED:", food);

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      food,
    });

  } catch (err) {
    console.error("ADD FOOD ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});