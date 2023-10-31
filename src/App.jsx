import AddComment from "./components/AddComment";
import MainComponent from "./pages/MainComponent";

const App = () => {
    return (
        <main className="max-w-[18.75rem] my-10 sm:max-w-xl md:max-w-[42rem] mx-auto">
            <MainComponent />
            <AddComment />
        </main>
    );
};

export default App;
