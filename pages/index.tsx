import { useCallback } from "react";

export default function Home() {

  const onGraphqlCall = useCallback( async () => {
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ query: "{ users { name } }" }),
      });
  
      const json = await response.json();
  
      console.log(json);
    } catch(err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div>
      <button onClick={onGraphqlCall}>Graphql Call</button>
    </div>
  );
};