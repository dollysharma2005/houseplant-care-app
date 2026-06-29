import { useNavigate } from 'react-router-dom'
import PlantForm from '../components/plants/PlantForm'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import { usePlants } from '../hooks/usePlants'
import { ROUTES } from '../utils/constants'

export default function AddPlantPage() {
  const navigate = useNavigate()
  const { addPlant } = usePlants()

  const handleSubmit = async (form) => {
    const created = await addPlant(form)
    navigate(ROUTES.PLANT_DETAIL(created.id))
  }

  return (
    <>
      <PageHeader
        title="Add Plant"
        description="Create a new plant entry for your collection."
      />
      <Card variant="glass">
        <PlantForm
          submitLabel="Add plant"
          onSubmit={handleSubmit}
          onCancel={() => navigate(ROUTES.PLANTS)}
        />
      </Card>
    </>
  )
}
