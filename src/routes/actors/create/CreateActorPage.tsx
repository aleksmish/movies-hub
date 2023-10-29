import CreateActorForm from '../components/CreateActorForm'

const CreateActorPage = () => {
  return (
    <div className='h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5'>
      <h3 className='mt-5 mb-5 font-semibold text-xl leading-6'>Create an Actor</h3>
      <CreateActorForm />
    </div>
  )
}

export default CreateActorPage