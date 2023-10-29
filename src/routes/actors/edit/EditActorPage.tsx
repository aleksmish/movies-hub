import EditActorForm from '../components/EditActor'

const EditActorPage = () => {
  return (
    <div className='h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5'>
      <h3 className='mt-5 mb-5 font-semibold text-xl leading-6'>Edit an Actor</h3>
      <EditActorForm />
    </div>
  )
}

export default EditActorPage