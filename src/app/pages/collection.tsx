import { useParams } from "react-router-dom";
import { BioCollection } from "../components/bio-collection";

export function Collection() {
    const { hash } = useParams();

    return <BioCollection interaction={true} hash={hash ?? ''}/>
}