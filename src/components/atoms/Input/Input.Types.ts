import React, { HTMLInputTypeAttribute } from "react"

export interface InputProps {
    label : string
    value : string
    onChange : (val :string) => void
    placeholder : string
    type ?: HTMLInputTypeAttribute
    required : boolean
    id ?: string
}