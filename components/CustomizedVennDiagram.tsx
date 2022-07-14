import { VennDiagram, asSets } from '@upsetjs/react'

type SetData = {
    name: string,
    elems: string[]
}

export default function CustomizedVennDiagram(props: any) {
    const vennDiagramSetData: SetData[] = props.vennDiagramSetData
    return (
        <VennDiagram
          sets={asSets(vennDiagramSetData)}
          width={780}
          height={400}
        //   selection={selection}
        //   onHover={setSelection}
        />
    );
}
