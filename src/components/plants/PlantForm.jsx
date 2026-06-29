import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Label from '../ui/Label'
import Select from '../ui/Select'
import Textarea from '../ui/Textarea'
import { PLANT_STATUSES, PLANT_STATUS_OPTIONS } from '../../utils/constants'
import { fadeInReduced, formReveal, getMotionProps } from '../../utils/motion'

const emptyForm = {
  plantName: '',
  species: '',
  room: '',
  status: PLANT_STATUSES.HEALTHY,
  notes: '',
  nextWateringDate: '',
}

export default function PlantForm({
  initialValues = emptyForm,
  submitLabel = 'Save plant',
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({ ...emptyForm, ...initialValues })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const reducedMotion = useReducedMotion()
  const revealProps = getMotionProps(reducedMotion, formReveal, fadeInReduced)

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.plantName.trim()) {
      setError('Plant name is required.')
      return
    }

    setSubmitting(true)

    try {
      await onSubmit(form)
    } catch (err) {
      setError(err.message ?? 'Unable to save plant.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={revealProps.initial}
      animate={revealProps.animate}
      transition={revealProps.transition}
      className="space-y-6"
    >
      {error && <Alert variant="error">{error}</Alert>}

      <Input
        id="plantName"
        label="Plant name"
        required
        value={form.plantName}
        onChange={handleChange('plantName')}
      />

      <Input
        id="species"
        label="Species"
        value={form.species}
        onChange={handleChange('species')}
      />

      <Input
        id="room"
        label="Room"
        value={form.room}
        onChange={handleChange('room')}
      />

      <div>
        <Label htmlFor="status" required>
          Status
        </Label>
        <Select
          id="status"
          value={form.status}
          onChange={handleChange('status')}
          required
        >
          {PLANT_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <Input
        id="nextWateringDate"
        type="date"
        label="Next watering date"
        value={form.nextWateringDate}
        onChange={handleChange('nextWateringDate')}
      />

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={form.notes}
          onChange={handleChange('notes')}
          placeholder="Care instructions, watering tips…"
          rows={4}
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" loading={submitting}>
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </motion.form>
  )
}
