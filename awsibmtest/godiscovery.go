package main

import (
  "encoding/json"
  "bufio"
  "fmt"
  "os"
  "github.com/IBM/go-sdk-core/core"
  "github.com/watson-developer-cloud/go-sdk/discoveryv1"
)

func create_environment(){
  discovery, discoveryErr := discoveryv1.
    NewDiscoveryV1(&discoveryv1.DiscoveryV1Options{
      URL: "https://gateway.watsonplatform.net/discovery/api",
      Version: "2019-04-30",
      IAMApiKey: "F9GMz8L1ligSRRlgnwJLIZpF2xZul0IPPTr8pdB6Q_YO",
   })
  if discoveryErr != nil {
    panic(discoveryErr)
  }

  response, responseErr := discovery.CreateEnvironment(
    &discoveryv1.CreateEnvironmentOptions{
      Name: core.StringPtr("lici_test:environment"),
      Description: core.StringPtr("environment created for test"),
    },
  )
  if responseErr != nil {
    panic(responseErr)
  }
  result := discovery.GetCreateEnvironmentResult(response)
  b, _ := json.MarshalIndent(result, "", "  ")
  fmt.Println(string(b))
}

func list_environments() {
  discovery, discoveryErr := discoveryv1.
    NewDiscoveryV1(&discoveryv1.DiscoveryV1Options{
      URL: "https://gateway.watsonplatform.net/discovery/api",
      Version: "2019-04-30",
      IAMApiKey: "F9GMz8L1ligSRRlgnwJLIZpF2xZul0IPPTr8pdB6Q_YO",
    })
  if discoveryErr != nil {
    panic(discoveryErr)
  }

  response, responseErr := discovery.ListEnvironments(
    &discoveryv1.ListEnvironmentsOptions{},
  )
  if responseErr != nil {
    panic(responseErr)
  }
  result := discovery.GetListEnvironmentsResult(response)
  var newsEnvironmentId *string
  for _, environment := range result.Environments {
    if *environment.Name == "Watson Discovery News Environment" {
      newsEnvironmentId = environment.EnvironmentID
   }
  }

  if newsEnvironmentId != nil {
    response, responseErr = discovery.ListCollections(
      &discoveryv1.ListCollectionsOptions{
        EnvironmentID: newsEnvironmentId,
      },
    )
  }
  if responseErr != nil {
    panic(responseErr)
  }
  fmt.Println(response)
}

func list_collections() {
  discovery, discoveryErr := discoveryv1.
    NewDiscoveryV1(&discoveryv1.DiscoveryV1Options{
      URL: "https://gateway.watsonplatform.net/discovery/api",
      Version: "2019-04-30",
      IAMApiKey: "F9GMz8L1ligSRRlgnwJLIZpF2xZul0IPPTr8pdB6Q_YO",
    })
  if discoveryErr != nil {
    panic(discoveryErr)
  }

  response, responseErr := discovery.ListCollections(
    &discoveryv1.ListCollectionsOptions{
      EnvironmentID: core.StringPtr("cd445224-291e-4f80-a996-cbccf0f70fc0"),
    },
  )
  if responseErr != nil {
    panic(responseErr)
  }
  result := discovery.GetListCollectionsResult(response)
  b, _ := json.MarshalIndent(result, "", "  ")
  fmt.Println(string(b))
}

func put_file_in_collection(document string)(string){
  discovery, discoveryErr := discoveryv1.
    NewDiscoveryV1(&discoveryv1.DiscoveryV1Options{
      URL: "https://gateway.watsonplatform.net/discovery/api",
      Version: "2019-04-30",
      IAMApiKey: "F9GMz8L1ligSRRlgnwJLIZpF2xZul0IPPTr8pdB6Q_YO",
    })
  if discoveryErr != nil {
    panic(discoveryErr)
  }
  filetoprocess := fmt.Sprintf("./%s", document)
  fmt.Println("opening ....", filetoprocess)
  file, fileErr := os.Open(filetoprocess)
    if fileErr != nil {
   panic(fileErr)
  }
  defer file.Close()

  response, responseErr := discovery.AddDocument(
    &discoveryv1.AddDocumentOptions{
      EnvironmentID: core.StringPtr("cd445224-291e-4f80-a996-cbccf0f70fc0"),
      CollectionID: core.StringPtr("7ac81b03-74e9-42d1-ba61-4277b2f63113"),
      File: file,
    },
  )
  if responseErr != nil {
    panic(responseErr)
  }
  result := discovery.GetAddDocumentResult(response)
  b, _ := json.MarshalIndent(result, "", "  ")
  return string(b)
}


func main(){
  fmt.Println("ingrese el nombre del documento a procesar...")
  input := bufio.NewScanner(os.Stdin)
  input.Scan()
  fmt.Println(">> ", input.Text())
  fmt.Println("Analizing document...")
  var rpf = put_file_in_collection(input.Text())
  fmt.Println(">> ", rpf)
}