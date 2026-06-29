import { useNavigate, useParams } from 'react-router-dom'
import PlantForm from '../components/plants/PlantForm'
import Alert from '../components/ui/Alert'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import { SkeletonForm } from '../components/ui/Skeleton'
import { usePlant, usePlants } from '../hooks/usePlants'
import { ROUTES } from '../utils/constants'

export default function EditPlantPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { plant, loading, error } = usePlant(id)
  const { editPlant } = usePlants()

  const handleSubmit = async (form) => {
    await editPlant(id, form)
    navigate(ROUTES.PLANT_DETAIL(id))
  }

  if (loading) {
    return (
      <>
        <PageHeader title="Edit Plant" description="Loading plant details…" />
        <SkeletonForm />
      </>
    )
  }

  if (error || !plant) {
    return <Alert variant="error">{error ?? 'Plant not found.'}</Alert>
  }

  return (
    <>
      <PageHeader
        title="Edit Plant"
        description={`Update details for ${plant.plantName}.`}
      />
      <Card variant="glass">
        <PlantForm
          initialValues={plant}
          submitLabel="Save changes"
          onSubmit={handleSubmit}
          onCancel={() => navigate(ROUTES.PLANT_DETAIL(id))}
        />
      </Card>
    </>
  )
}
