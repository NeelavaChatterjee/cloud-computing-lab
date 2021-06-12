const express = require('express')
const Diary = require('../models/diary-entry')
const router = new express.Router()

// New Diary Entry
router.post('/diary', async (req, res) => {
    const diaryEntry = new Diary(req.body)

    try {
        await diaryEntry.save()
        res.status(201).send(diaryEntry)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get the diary
router.get('/diary', async (req, res) => {
    try {
        const diary = await Diary.find({}).sort({ date: 'descending' })
        res.send(diary)
    } catch (e) {
        res.status(500).send()
    }
})

// Get a single diary entry
router.get('/diary/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const diaryEntry = await Diary.findById(_id)

        if (!diaryEntry) {
            return res.status(404).send()
        }

        res.send(diaryEntry)
    } catch (e) {
        res.status(500).send()
    }
})

// Edit/Update a diary entry
router.patch('/diary/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['message']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const diaryEntry = await Diary.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!diaryEntry) {
            return res.status(404).send()
        }

        res.send(diaryEntry)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete a diary entry
router.delete('/diary/:id', async (req, res) => {
    try {
        const diaryEntry = await Diary.findByIdAndDelete(req.params.id)

        if (!diaryEntry) {
            res.status(404).send()
        }

        res.send(diaryEntry)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router