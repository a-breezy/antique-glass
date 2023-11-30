import mongoose from "mongoose"

const glassSchema = mongoose.Schema(
    {
        title: {
            type:String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        availability: {
            type: Boolean,
            required: true
        },
    },
    {
        timestamps: true
    }
)

export const Glass = mongoose.model('Glass', glassSchema)
