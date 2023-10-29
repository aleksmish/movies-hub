import { Outlet } from "react-router-dom"

const Navigation = () => {
	return (
    <>
      <header className="h-[70px] flex flex-row justify-center content-center w-full m-auto border-b-[solid #e9f4f7] border-b-[1px]">
        <div className="flex flex-row justify-between align-middle content-center w-full p-5 max-w-[1200px]">
          <div className="flex flex-row self-center justify-center content-center">
            <h1>
              <a href="/">MoviesHub</a>
            </h1>
          </div>
          <div className="flex gap-5 flex-row self-center justify-center content-center">
            <div><a href="/actors">Actors</a></div>
            <div ><a href="/genres">Genres</a></div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
	)
}

export default Navigation